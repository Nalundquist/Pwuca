import React, {useState, useEffect} from 'react';
import StartPage from './StartPage';
import NewGame from './NewGame';
import GameBoardControl from './GameBoardControl';
import {v4} from 'uuid';

function BodyControl(){
	const bodyStyle = {
		margin: '15px'
	}

	const [newGameVisible, setNewGameVisible] = useState(false);
	const [playerNamePromptVisible, setPlayerNamePromptVisible] = useState(false);
	const [gameBoardVisible, setGameBoardVisible] = useState(false)
	const [playerQuantity, setPlayerQuantity] = useState(null);
	const [players, setPlayers] = useState([])

	const handleNewGameForm = () => {
		setNewGameVisible(!newGameVisible);
	}

	const handlePlayerNumber = (players) => {
		setPlayerQuantity(players);
		setPlayerNamePromptVisible(true);
	}

	const handleNewPlayers = (players) => {
		const playersList = []
		players.forEach(player => {
			playersList.concat({
				name: player.name,
				pwuca: player.pwuca,
				isTurn: player.isTurn,
				id: player.id,
				key: player.id
			})
		});
		setPlayers(playersList);
		setNewGameVisible(false);
		setGameBoardVisible(true);
	}

	let visiblePageElement;

	if (gameBoardVisible){
		visiblePageElement = <GameBoardControl playerList={players} />
	} else if (newGameVisible){
		visiblePageElement =
		  <NewGame
			  playerNumberInput={handlePlayerNumber}
				newPlayerInput={handleNewPlayers}
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