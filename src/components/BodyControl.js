import NewRoom from './NewRoom';
import JoinRoom from './JoinRoom';
import WaitLobby from './WaitLobby';
import GameBoardControl from './GameBoardControl';
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {nanoid} from 'nanoid';
import { auth, db } from '../firebase';
import { 
	doc,
	addDoc, 
	updateDoc, 
	getDoc,
	getDocs,
	query,
	collection,
  where, 
	onSnapshot} from 'firebase/firestore';

function BodyControl(props){

	const { userPlayer, userPlayerId } = props;
	const [room, setRoom] = useState(null);
	const [roomId, setRoomId] = useState("");
	const [roomError, setRoomError] = useState(null);
	const [roomInput, setRoomInput] = useState(null);

	useEffect(() => {
		if (roomError) {
			setTimeout(() => {
				setRoomError(!roomError);
			}, 3000)
		}
		if (userPlayer != null){
			if (userPlayer.inRoom){
				const roomRef = doc(db, "Rooms", userPlayer.currentRoom);
				const roomSnap = getDoc(roomRef);
				if (roomSnap.exists()) { 
					setRoom(roomSnap.data());
				} else {
					setRoom(null);
					handleRemovePlayerFromRoom()
				}
			}
		}
		if (room){
			const queryRoom = query(collection(db, 'players'), where("id", "==", room.id));
			const unSubscribe = onSnapshot(queryRoom, (docSnapshot) => {
				const currentRoom = docSnapshot.data();
				setRoom(currentRoom);
			},
			(error) => {
				setRoomError('An error occurred while updating room from database');
				console.log('double ruh roh (something bad updating room from firestore)')
			})
			return () => unSubscribe;
		}
	}, []);

	const handleRoomInput = (event) => {
		setRoomInput(event.target.value);
	}

const handleAddPlayerToRoom = (docRef) => {
	const newUserPlayer = {
		name: userPlayer.name,
		pwuca: userPlayer.pwuca,
		turnOrder: userPlayer.turnOrder,
		isTurn: false,
		userId: userPlayer.userId,
		inRoom: true,
		currentRoom: docRef.id
	}
	updateDoc(docRef, newUserPlayer);
	setUserPlayer(newUserPlayer);
}
	
	const handleMakeRoom = () => {
		const newRoom = addDoc(collection(db, "Rooms"), {
			playerList: [],
			shareId: nanoid(6),
			word: "",
			turn: 1,
			currentPlayer: null,
			playing: false,
			challenge: 0,
			challengingPlayer: null,
			challengedPlayer: null
		})
			.then((docRef) => 
				handleAssignPlayer(docRef)
					.then((docRef) => 
						handleAddPlayerToRoom(docRef)
					));
	}
	
	const handleJoinRoom = async () => {
		const queryRoom = query(collection(db, "Rooms"), where("shareId", "==", roomInput));
		console.log(queryRoom);
		const roomSnap = await getDocs(queryRoom);
		if (roomSnap.exists()) {
			const selectedRoom = roomSnap.data();
			const roomPlayerList = selectedRoom.playerList;
			if (roomPlayerList.length < 7 && selectedRoom.playing != true){
				roomPlayerList.concat(userPlayer);
				const roomRef = doc(db, "Rooms", roomSnap.id);
				await updateDoc(roomRef, {
					playerList: roomPlayerList
				});
				handleAssignPlayer(roomRef)
			} else if (selectedRoom.length >= 7){
				setRoomError("That room is full")
			} else if (selectedRoom.playing) {
				setRoomError("The room has a game in progress");
			} else {
				setRoomError("There was an error joining the room")
			}
		} else {
			setRoomError("The specified room was not found")
		}
		setRoomInput(null);
	}
	
	const handleAssignPlayer = async (docRef) => {
		const playerRef = doc(db, "Players", userPlayerId);
		const updatePlayer = {
			inRoom: true,
			currentRoom: docRef.id
		};
		await updateDoc(playerRef, updatePlayer);
	}

	const handleRemoveRoomFromPlayer = async () => {
		const playerRef = doc(db, "Players", userPlayerId);
		const updatePlayer = {
			inRoom: false,
			currentRoom: null
		};
		await updateDoc(playerRef, updatePlayer);
	}

	const handleRemovePlayerFromRoom = async (roomId) => {
		const roomRef = doc(db, "Rooms", roomId);
		const roomSnap = await getDoc(roomRef);
		if (roomSnap.exists()) {
			const thisRoom = roomSnap.data();
			const newPlayerList = thisRoom.playerList.filter(player => player.userId != auth.currentUser.uid)[0];
			await updateDoc(roomRef, {
				playerList: newPlayerList
			});
		}
		handleRemoveRoomFromPlayer();
	}

	const handleShuffle = () => {
		let shufflePlayerList = {...room.playerList};
		let lengthCount = shufflePlayerList.length, randIndex;
		while (lengthCount != 0) {
			randIndex = Math.floor(Math.random()*lengthCount);
			lengthCount--;
			[shufflePlayerList[lengthCount], shufflePlayerList[randIndex]] =
			[shufflePlayerList[randIndex], shufflePlayerList[lengthCount]];
			shufflePlayerList[lengthCount].turnOrder = (shufflePlayerList.indexOf(shufflePlayerList[lengthCount])+1);
		}
		return shufflePlayerList;
	}

	const handleStartGame = async () => {
		if (room.playerList > 1){
			const roomRef = doc(db, "Rooms", room.id);
				const newPlayerList = handleShuffle();
				await updateDoc(roomRef, {
					playerList: newPlayerList,
					playing: true,
				});
		}
	}

	const bodyContainer = {
		width: '95%'
	}

	const roomTableStyle = {
		position: 'relative',
		padding: '20px',
		top: '30%',
		left: '30%',
		width: '50%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}

	const roomBoxStyle = {
		border: '2px solid brown',
		margin: '10px',
		padding: '12px'
	}

	let visiblePageElement;

	if (room) {
		if (room.playing){
			visiblePageElement = 
				<GameBoardControl
					gameRoom={room}
					gamePlayer={userPlayer} />
		} else {
			visiblePageElement = 
			<WaitLobby waitRoom={room}
			waitPlayer={userPlayer}
			onClickStartGame={handleStartGame} />
		}
	} else {
		visiblePageElement = 
		<div style={roomTableStyle}>
			<div style={roomBoxStyle}>
				<NewRoom onClickMakeRoom={handleMakeRoom} />
			</div>
			<div style={roomBoxStyle}>
				<JoinRoom 
					onClickRoomJoin={handleJoinRoom} 
					listenRoomJoin={handleRoomInput} />
			</div>
		</div>
	}
	return(
		<div style={bodyContainer}>
			{visiblePageElement}
		</div>
	)
}

BodyControl.propTypes = {
	userPlayer: PropTypes.object,
	setUserPlayer: PropTypes.func
}

export default BodyControl;