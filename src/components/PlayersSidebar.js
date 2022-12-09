import React from 'react';
import PropTypes from 'prop-types';
import Player from './Player';

function PlayersSidebar(props){
	const {players, activePlayer} = props
	const sidebarStyle ={
		borderLeft: '2px solid brown',
		padding: '5px',
		width: '30%',
	}
	return (
		<React.Fragment>
			<div style={sidebarStyle}>
				{Array.from(players).map(player => {
						console.log ("player id: " + player.id);
						console.log("current player id: " + activePlayer.id)
						{<p>something</p>}
						if (player.id === activePlayer.id){
							<strong><Player
								name={player.name}
								pwuca={player.pwuca}
								key={player.id} /></strong>
						} else {
							console.log('else statement')
							{<Player
								name={player.name}
								pwuca={player.pwuca}
								key={player.id} />
							}
						}
					}
				)}
			</div>
		</React.Fragment>
	)
}

PlayersSidebar.propTypes = {
	players: PropTypes.array,
	activePlayer: PropTypes.object
}

export default PlayersSidebar; 
