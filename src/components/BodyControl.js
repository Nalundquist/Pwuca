import React, {useState, useEffect} from 'react';
import StartPage from './StartPage';
import NewGame from './NewGame';
import GameBoardControl from './GameBoardControl';
import {v4} from 'uuid';
import {nanoid} from 'nanoid';
import { addDoc, updateDoc } from 'firebase/firestore';
import { auth } from '../firebase';

function BodyControl(){
	const bodyStyle = {
		margin: '15px'
	}

	const [room, setRoom] = useState(null);
	const [roomList, setRoomList] = useState([]);
	const [newGameVisible, setNewGameVisible] = useState(false);
	const [playerNamePromptVisible, setPlayerNamePromptVisible] = useState(false);
	const [gameBoardVisible, setGameBoardVisible] = useState(false)
	// const [playerQuantity, setPlayerQuantity] = useState(null);
	// const [playerNames, setPlayerNames] = useState([])
	// const [players, setPlayers] = useState([])

	const handleNewGameForm = () => {
		setNewGameVisible(!newGameVisible);
	}

	const handleMakeRoom = async () => {
		const currentPlayer = {
			name: auth.currentUser.displayName,
			pwuca: "",
			turnOrder: null,
			isTurn: false,
			id: auth.currentUser.uid
		}

		const room = {
			playerList: [currentPlayer],
			id: v4(),
			shareId: nanoid(6),
			word: "",
			turn: 1,
			currentPlayer: null,
			playing: false,
			challenge: 0
		}
		await addDoc(collection(db, "rooms"), room);
	}

	const selectRoom = async (shareId, userId) => {
		const selectedRoom = roomList.filter(room => room.id === id)[0];
		const roomPlayerList = selectedRoom.playerList;
		const currentPlayer = {
			name: auth.currentUser.displayName,
			pwuca: "",
			turnOrder: null,
			isTurn: false,
			id: auth.currentUser.uid
		}
		roomPlayerList.concat(currentPlayer);
		await setRoom(selectedRoom);
	}

	const handlePlayerNumber = (players) => {
		setPlayerQuantity(players);
		setPlayerNamePromptVisible(true);
	}

	// const handlePlayerName = (index, event) => {
	// 	let newNameList = [...playerNames];
	// 	newNameList[index] = event.target.value;
	// 	setPlayerNames(newNameList);
	// }

	const randomTurnOrder = (playerList) => {
		let lengthCount = playerList.length, randIndex;
		while (lengthCount != 0) {
			randIndex = Math.floor(Math.random()*lengthCount);
			lengthCount--
			[playerList[lengthCount], playerList[randIndex]] =
			[playerList[randIndex], playerList[lengthCount]] 
			playerList[lengthCount].turnOrder = (playerList.indexOf(playerList[lengthCount])+1);
		}
		return playerList;
	}
	// const handleNewPlayers = (playersNames) => {
	// 	let playersList = []
	// 	playersNames.forEach(playerName => {
	// 		playersList = playersList.concat({
	// 			name: auth.currentUser.displayName,
	// 			pwuca: "",
	// 			turnOrder: null,
	// 			isTurn: false,
	// 			id: auth.currentUser.uid
	// 		})
	// 	});
	// 	setPlayers(randomTurnOrder(playersList));
	// 	setNewGameVisible(false);
	// 	setGameBoardVisible(true);
	// }

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

export default BodyControl;