import React, {useState, useEffect} from 'react';
import StartPage from './StartPage';
import NewGame from './NewGame';
import GameBoardControl from './GameBoardControl';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import { db, auth } from '../firebase';
import PropTypes from "prop-types";
import { 
	doc,
	addDoc, 
	updateDoc, 
	getDoc,
	query,
	collection,
  where } from 'firebase/firestore';

function BodyControl(props){
	const bodyStyle = {
		margin: '15px'
	}

	const { userPlayer, setUserPlayer } = props;
	const [roomError, setRoomError] = useState(null);
	const [gameBoardVisible, setGameBoardVisible] = useState(false);
	const [roomInput, setRoomInput] = useState(null);

	useEffect(() => {
		if (roomError) {
			setTimeout(() => {
				setRoomError(!roomError);
			}, 3000)
		}
		if (userPlayer.inRoom){
			const roomRef = doc(db, "rooms", userPlayer.currentRoom);
			if (roomRef.exists()) {

			}
		}
	})

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
		const playerRef = doc(db, "players", userPlayer.id)
		const updatePlayer = {
			inRoom: false,
			currentRoom: null
		}
		await updateDoc(playerRef, updatePlayer)
	}

	const handleRemovePlayerFromRoom = async (roomId, playerId) => {
		const roomRef = doc(db, "rooms", roomId);
		const roomSnap = await getDoc(roomRef);
		if (roomSnap.exists()) {
			const thisRoom = roomSnap.data()
			const newPlayerList = thisRoom.playerList.filter(player => player.id != playerId)[0];
			await updateDoc(roomRef, {
				playerList: newPlayerList
			})
		}
	}

	const randomTurnOrder = (playerList) => {
		let lengthCount = playerList.length, randIndex;
		while (lengthCount != 0) {
			randIndex = Math.floor(Math.random()*lengthCount);
			lengthCount--;
			[playerList[lengthCount], playerList[randIndex]] =
			[playerList[randIndex], playerList[lengthCount]] 
			playerList[lengthCount].turnOrder = (playerList.indexOf(playerList[lengthCount])+1);
		}
		return playerList;
	}

	const changePlayerScore = (thisPlayer) => {
		
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

	if (gameBoardVisible){
		visiblePageElement = 
			<GameBoardControl
				playerList={players}
				changeScore={changePlayerScore} />
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