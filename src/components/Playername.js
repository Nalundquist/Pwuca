import React from "react";
import PropTypes from 'prop-types';

function PlayerName(props){
	const {
		playerQuan,
		submitNewPlayers,
		playerNames,
		submitPlayerName} = props;

	function handleNewPlayerFormSubmit(event) {
		event.preventDefault();
		submitNewPlayers(playerNames);
	}



	let playerNameForm = [...Array(playerQuan).keys()];
	
	return(
		<React.Fragment>
			<h3>Names of those who wish to partake?</h3>
			<form onSubmit={handleNewPlayerFormSubmit}>
				{playerNameForm.map((playerName, index) => 
					<div key={index}>
						<input
							type='text'
							name='name'
							onChange={event => submitPlayerName(index, event)}
							placeholder="Player Name"/>
					</div>
				)}
			<button type="submit">Begin our dance.</button>
			</form>
		</React.Fragment>
	)
}

PlayerName.propTypes = {
	playerQuan: PropTypes.number,
	submitNewPlayers: PropTypes.func
}

export default PlayerName;