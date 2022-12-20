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
	const [newGameVisible, setNewGameVisible] = useState(false);
	const [playerNamePromptVisible, setPlayerNamePromptVisible] = useState(false);
	const [gameBoardVisible, setGameBoardVisible] = useState(false);

	useEffect(() => {
		if (roomError) {
			setTimeout(() => {
				setRoomError(!roomError);
			}, 3000)
		}
	})
	const handleNewGameForm = () => {
		setNewGameVisible(!newGameVisible);
	}

	const handleMakeRoom = async () => {
		const room = {
			playerList: [currentPlayer],
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
			.then(assignPlayer(userPlayer.id));
	}

	const joinRoom = async (shareId) => {
		const queryRoom = query(collection(db, "rooms"), where("shareId", "==", shareId));
		const roomSnap = await getDoc(queryRoom);
		if (roomSnap.exists()) {
			const selectedRoom = roomSnap.data();
			const roomPlayerList = selectedRoom.playerList;
			if (roomPlayerList.length < 7 && selectedRoom.playing != true){
				roomPlayerList.concat(player);
				const roomRef = doc(db, "rooms", selectedRoom.id);
				await updateDoc(roomRef, {
					playerList: roomPlayerList
				});
				assignPlayer(selectedRoom.id)
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
	}

	const assignPlayer = async (roomId) => {
		const playerRef = (doc, "players", userPlayer.id);
		const updatePlayer = {
			inRoom: true,
			currentRoom: roomId
		};
		await updateDoc(playerRef, updatePlayer);
	}

	const handlePlayerNumber = (players) => {
		setPlayerQuantity(players);
		setPlayerNamePromptVisible(true);
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
		if(thisPlayer.pwuca === ""){
			thisPlayer.pwuca = "P"
		} else if (thisPlayer.pwuca === "P") {
			thisPlayer.pwuca = "PW"
		} else if (thisPlayer.pwuca === "PW") {
			thisPlayer.pwuca = "PWU"
		} else if (thisPlayer.pwuca === "PWU") {
			thisPlayer.pwuca = "PWUC"
		} else{
			thisPlayer.pwuca = "PWUCA"
		} 

		const editedPlayerList = players
			.filter(player => player.id !== thisPlayer.id)
			.concat(thisPlayer)
		setPlayers(editedPlayerList);
	}

	let visiblePageElement;

	if (gameBoardVisible){
		visiblePageElement = 
			<GameBoardControl
				playerList={players}
				changeScore={changePlayerScore} />
	} else if (newGameVisible){
		visiblePageElement =
		  <NewGame
			  playerNumberInput={handlePlayerNumber}
				newPlayerInput={handleNewPlayers}
				newPlayerName={handlePlayerName}
				playerNamesList={playerNames}
				playerNumber={playerQuantity} 
				namePromptVisible={playerNamePromptVisible} />
	} else {
		visiblePageElement = <StartPage newGameOnClick={handleNewGameForm} />
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