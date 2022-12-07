import React, {setState, useEffect} from 'react';
import StartPage from './StartPage';
import NewGame from './NewGame';
import {v4} from 'uuid';

function BodyControl(){
	const bodyStyle = {
		margin: '15px'
	}

	const [newGameVisible, setNewGameVisible] = setState(false);
	const [playerNamePromptVisible, setPlayerNamePromptVisible] = setState(false);
	const [gameBoardVisible, setGameBoardVisible] = setState(false)
	const [playerQuantity, setPlayerQuantity] = setState(null);
	const [players, setPlayers] = setState([])

	const handleNewGameForm = () => {
		setNewGameVisible(!newGameVisible);
	}

	const handlePlayerNumber = (players) => {
		setPlayerQuantity(players);
		setPlayerNamePromptVisible(true);
	}

	const handleNewPlayers = (playerNames) => {
		const playersList = []
		playerNames.forEach(playerName => {
			playersList.concat({
				name: playerName,
				pwuca: "",
				isTurn: false,
				id: v4()
			})
		});
		setPlayers(playersList);
		setNewGameVisible(false);
		setGameBoardVisible(true);
	}
	
	let visiblePageElement;

	if (gameBoardVisible){
		visiblePageElement = <GameBoardControl />
	} else if (newGameVisible){
		visiblePageElement =
		  <NewGame
			  playerNumberInput={handlePlayerNumber}
				newPlayerInput={handleNewPlayers}
				playerAmount={playerQuantity} 
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