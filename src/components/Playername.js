import React from "react";
import PropTypes from 'prop-types';

function PlayerName(props){
	const {playerQuan, submitNewPlayers} = props;

	function handleNewPlayerFormSubmit(event) {
		event.preventDefault();
		submitNewPlayers()
	}

	return(
		<React.Fragment>
			<h3>Names of those who wish to partake?</h3>
			<form onSubmit={handleNewPlayerFormSubmit}>
				{(() => {
					for (let i=0; i > playerQuan; i++){
					<input
						type='text'
						name='name'
						placeholder="Player's Name" />
				}})}
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