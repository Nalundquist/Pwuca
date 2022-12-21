import React from 'react';
import PropTypes from 'prop-types';
import PlayersSidebar from './PlayersSidebar';

function WaitLobby(props){

	const { waitRoom, onClickStartGame } = props;
	const playerAmount = waitRoom.playerList.Length;

	const waitStyleContainer = {
		position: 'relative',
		top:'30%',
		left: '30%',
		padding: '20px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	}

	const waitDialogueStyle = {
		position: 'relative',
		border: '2px solid brown',
		margin: '10px',
		padding: '12px',
		textAlign: 'center',
		height: '8vh',
		width: '12vh'
	}

	const bottomContainerStyle = {
		display: 'flex',
		flexDirection: 'row',
		margin: '3px',
		justifyContent: 'space-between'
	}

	const startButtonStyle = {
		position: 'relative',
		border: '2px solid brown',
		margin: '10px',
		padding: '12px',
		textAlign: 'center',
		height: '4vh',
		width: '6vh',
	}

	return(
		<React.Fragment>
			<div style={waitStyleContainer}>
				<div style={waitDialogueStyle}>
					{playerAmount >= 6 
					? <div>
							<h4>The room is full.</h4>
							<p>Begin whenever you like.</p>
						</div>
					: <h4>Waiting for players...</h4>}
				</div>
				<div style={bottomContainerStyle}>
				
				{ playerAmount < 2 ? <div style={startButtonStyle} onClick={onClickStartGame}>Begin Game</div> : null }
				</div>
			</div>
			<PlayersSidebar players={waitRoom.PlayerList} />
		</React.Fragment>

	)
}

WaitLobby.propTypes = {
	onClickStartGame: PropTypes.func,
	waitRoom: PropTypes.object
}

export default WaitLobby;