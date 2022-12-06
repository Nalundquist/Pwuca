import React from "react";
import PlayerAmount from './PlayerAmount';
import PlayerName from './PlayerName';

function NewGame(props){
	const {
		playerNumberInput,
		newPlayerInput,
		playerAmount,
		namePromptVisible} = props;

	const promptStyle = {
		position: 'relative',
		top: '40%',
		left: '40%',
		border: '2px solid brown',
		padding: '15px'
	}

	if (namePromptVisible){
		
	}
	
	return(
		<React.Fragment>
			<div style={promptStyle}>
				{visibleElement}
			</div>
		</React.Fragment>
	)
}