import React from "react";
import PropTypes from 'prop-types';

function NewRoom(props){

	const topTextStyle = {
		margin: '7px',
		marginBottom: '5px',
		fontWeight: 'bold'

	}

	return(
		<React.Fragment>
			<div style={topTextStyle}>
				<h4>Create a new room</h4>
			</div>
			<button onClick={props.onClickMakeRoom}>Make</button>
		</React.Fragment>	
	)
}

NewRoom.propTypes = {
	onClickMakeRoom: PropTypes.func
}

export default NewRoom;