import React from "react";
import PropTypes from 'prop-types';

function JoinRoom(props){

	const { onClickRoomJoin, roomToJoin, listenRoomJoin } = props;

	const topTextStyle = {
		margin: '7px',
		marginBottom: '5px',
		fontWeight: 'bold'
	}

	return(
		<React.Fragment>
			<div style={topTextStyle}>
				<h4>Join a Room</h4>
			</div>
			<div>
				<input
					type="text"
					name="roomId"/>
			</div>
		</React.Fragment>
	)
}

JoinRoom.propTypes = {
	onClickRoomJoin: PropTypes.func,
	listenRoomJoin: PropTypes.func,
	roomToJoin: PropTypes.string
}

export default JoinRoom;