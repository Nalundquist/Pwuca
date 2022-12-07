import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

function PlayersSidebar(props){
	const sidebarStyle ={
		borderLeft: '2px solid brown',
		padding: '5px',
		width: '30%',
	}
	return (
		<React.Fragment>
			<div style={sidebarStyle}>
				{Array.from(props.players).map(player =>
				<Player
					name={player.name}
					pwuca={player.pwuca} />
				)}
			</div>
		</React.Fragment>
	)
}

PlayersSidebar.propTypes = {
	players: PropTypes.object
}

export default PlayersSidebar; 
