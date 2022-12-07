import React, {useState, useEffect} from 'react';
import PlayersSidebar from './PlayersSidebar';
import Word from './Word';
import PropTypes from 'prop-types'

function GameBoardControl(props){
  const container = {
		display: 'flex',
		flexDirection: 'row'
	}
	const boardStyle = {
		width: '70%',
		padding: '30px'
	}
	console.log(props.playerList)
	return (
		<React.Fragment>
			<div style={container}>
				<div style={boardStyle}>
			<p>boop</p>
				</div>
			<PlayersSidebar players={props.playerList} />

			</div>
		</React.Fragment>
	)
}

GameBoardControl.propTypes = {
	playerList: PropTypes.array
}
export default GameBoardControl;