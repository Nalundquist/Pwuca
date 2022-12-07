import React from "react";
import PlayerAmount from './PlayerAmount';
import PlayerName from './PlayerName';
import PropTypes from 'prop-types';

function NewGame(props){
	const {
		playerNumberInput,
		newPlayerInput,
		playerNumber,
		namePromptVisible,
		newPlayerName,
		playerNamesList} = props;

	const promptStyle = {
		position: 'relative',
		width: '30%',
		top: '40%',
		left: '40%',
		border: '2px solid brown',
		padding: '15px'
	}

	let visibleElement;

	if (namePromptVisible){
		visibleElement = <PlayerName
			playerQuan={playerNumber}
			playerNames={playerNamesList}
			submitPlayerName={newPlayerName}
			submitNewPlayers={newPlayerInput}
			/>
	} else {
		visibleElement = <PlayerAmount
			submitPlayerNumber={playerNumberInput} />
	}
	
	return(
		<React.Fragment>
			<div style={promptStyle}>
				{visibleElement}
			</div>
		</React.Fragment>
	)
}

NewGame.propTypes = {
	playerNumberInput: PropTypes.func,
	newPlayerInput: PropTypes.func,
	newPlayerName: PropTypes.func,
	playerNumber: PropTypes.number,
	namePromptVisible: PropTypes.bool
}

export default NewGame;