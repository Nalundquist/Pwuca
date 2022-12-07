import React from "react";
import PropTypes from 'prop-types';
import {v4} from 'uuid';

function PlayerName(props){
	const {playerQuan, submitNewPlayers} = props;

	function handleNewPlayerFormSubmit(event) {
		event.preventDefault();
		console.log(event.target)
		submitNewPlayers(event.target);
	}

	
	let playerNameForm = [...Array(playerQuan).keys()];
	
	return(
		<React.Fragment>
			<h3>Names of those who wish to partake?</h3>
			<form onSubmit={handleNewPlayerFormSubmit}>
				{playerNameForm.map((playerName) => 
					<React.Fragment>
						<input
							type='text'
							name='name'
							placeholder="Player Name" />
					</React.Fragment>
				)}
			</form>
			<button type="submit">Begin our dance.</button>
		</React.Fragment>
	)
}

PlayerName.propTypes = {
	playerQuan: PropTypes.number,
	submitNewPlayers: PropTypes.func
}

export default PlayerName;