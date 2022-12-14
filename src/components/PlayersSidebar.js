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
						if (player.id === activePlayer.id){
							return(
								<div style={{fontSize: '1.2em', color: 'red'}}>
									<Player
										name={player.name}
										pwuca={player.pwuca}
										key={player.id} />
								</div>
						)
						} else {
							return(
								<Player
									name={player.name}
									pwuca={player.pwuca}
									key={player.id} />
							)
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
