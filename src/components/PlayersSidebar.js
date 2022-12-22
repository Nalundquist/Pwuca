import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

function PlayersSidebar(props){
	const {players} = props
	const sidebarStyle ={
		borderLeft: '2px solid brown',
		padding: '5px',
		width: '30%',
	}
	return (
		<React.Fragment>
			<div style={sidebarStyle}>
				{/* {Array.from(players).map(player => {
					return(
						<Player
							name={player.name}
							pwuca={player.pwuca}
							key={player.id} />
					)	
				})} */}
				<p>players go here</p>
			</div>
		</React.Fragment>
	)
}

PlayersSidebar.propTypes = {
	players: PropTypes.array,
	activePlayer: PropTypes.object
}

export default PlayersSidebar; 
