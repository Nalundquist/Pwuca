import React from "react";
import PropTypes from 'prop-types';

function PlayerAmount(props){

	function handlePlayerAmount(event){
		event.preventDefault();
		props.submitPlayerNumber(event.target.number.value)
	}
	return(
		<form onSubmit={handlePlayerAmount}>
			<input
				type="number" 
				name="number"
				placeholder="Input players (2-5)"/>
			<button type="submit">Continue</button>
		</form>
	)

}

PlayerAmount.propTypes = {
	submitPlayerNumber: PropTypes.func
}

export default PlayerAmount;