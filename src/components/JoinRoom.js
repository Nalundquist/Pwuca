import React from "react";
import PropTypes from 'prop-types';

function JoinRoom(props){

	const { onClickRoomJoin, listenRoomJoin } = props;

	const topTextStyle = {
		margin: '7px',
		marginBottom: '5px',
		fontWeight: 'bold'
	}

	return(
		<React.Fragment>
			<div style={topTextStyle}>
				<h4>Join a Room</h4>
				<p>Input a room share id below.</p>
			</div>
			<div>
				<input
					type="text"
					name="shareId"
					maxLength='6'
					onChange={event => listenRoomJoin(event)} />
				<button onClick={onClickRoomJoin}>Join</button>
			</div>

		</React.Fragment>
	)
}

JoinRoom.propTypes = {
	onClickRoomJoin: PropTypes.func,
	listenRoomJoin: PropTypes.func
}

export default JoinRoom;