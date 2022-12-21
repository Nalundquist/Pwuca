import NewRoom from './NewRoom';
import JoinRoom from './JoinRoom';
import WaitLobby from './WaitLobby';
import GameBoardControl from './GameBoardControl';
import React, {useState, useEffect} from 'react';
import PropTypes from "prop-types";
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import { db } from '../firebase';
import { 
	doc,
	addDoc, 
	updateDoc, 
	getDoc,
	query,
	collection,
  where, 
	onSnapshot} from 'firebase/firestore';

function BodyControl(props){
	const bodyStyle = {
		margin: '15px'
	}

	const { userPlayer } = props;
	const [room, setRoom] = useState(null);
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
				const roomRef = doc(db, "rooms", userPlayer.currentRoom);
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
	
	const handleMakeRoom = async () => {
		const room = {
			playerList: [userPlayer],
			id: v4(),
			shareId: nanoid(6),
			word: "",
			turn: 1,
			currentPlayer: null,
			playing: false,
			challenge: 0,
			challengingPlayer: null,
			challengedPlayer: null
		}
		await addDoc(collection(db, "rooms"), room)
		.then(handleAssignPlayer(userPlayer.id));
	}
	
	const handleJoinRoom = async () => {
		const queryRoom = query(collection(db, "rooms"), where("shareId", "==", roomInput));
		const roomSnap = await getDoc(queryRoom);
		if (roomSnap.exists()) {
			const selectedRoom = roomSnap.data();
			const roomPlayerList = selectedRoom.playerList;
			if (roomPlayerList.length < 7 && selectedRoom.playing != true){
				roomPlayerList.concat(userPlayer);
				const roomRef = doc(db, "rooms", selectedRoom.id);
				await updateDoc(roomRef, {
					playerList: roomPlayerList
				});
				handleAssignPlayer(selectedRoom.id)
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
	
	const handleAssignPlayer = async (roomId) => {
		const playerRef = doc(db, "players", userPlayer.id);
		const updatePlayer = {
			inRoom: true,
			currentRoom: roomId
		};
		await updateDoc(playerRef, updatePlayer);
	}

	const handleRemoveRoomFromPlayer = async () => {
		const playerRef = doc(db, "players", userPlayer.id);
		const updatePlayer = {
			inRoom: false,
			currentRoom: null
		};
		await updateDoc(playerRef, updatePlayer);
	}

	const handleRemovePlayerFromRoom = async (roomId, playerId) => {
		const roomRef = doc(db, "rooms", roomId);
		const roomSnap = await getDoc(roomRef);
		if (roomSnap.exists()) {
			const thisRoom = roomSnap.data();
			const newPlayerList = thisRoom.playerList.filter(player => player.id != playerId)[0];
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
			const roomRef = doc(db, "rooms", room.id);
				const newPlayerList = handleShuffle();
				await updateDoc(roomRef, {
					playerList: newPlayerList,
					playing: true,
				});
		}
	}

	const roomTableStyle = {
		position: 'relative',
		padding: '20px',
		top: '30%',
		left: '30%',
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
		visiblePageElement = <div>
			<p></p>
		</div>
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
		<div style={bodyStyle}>
			{visiblePageElement}
		</div>
	)
}

BodyControl.propTypes = {
	userPlayer: PropTypes.object,
	setUserPlayer: PropTypes.func
}

export default BodyControl;