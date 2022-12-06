import React, {setState, useEffect} from 'react';
import StartPage from './StartPage';
import NewGame from './NewGame';

function BodyControl(){
	const bodyStyle = {
		margin: '15px'
	}

	const [newGameVisible, setNewGameVisible] = setState(false);
	const [playerQuantity, setPlayerQuantity] = setState(null);
	const [players, setPlayers] = setState([])

	const handleNewGameForm = () => {
		setNewGameVisible(!newGameVisible);
	}

	const handlePlayerNumber = (players) => {
		setPlayerQuantity(players)
	}

	let visiblePageElement;

	if (newGameVisible){
		visiblePageElement = <NewGame />
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