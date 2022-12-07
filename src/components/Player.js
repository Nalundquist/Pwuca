import React from 'react';
import PropTypes from 'prop-types';

function Player(props){

	const {name, pwuca} = props;
	
	const playerStyle = {
		border: '1px solid brown',
		padding: '8px',
		margin: '10px',
	}

	const pwucaStyle = {
		letterSpacing: '.4rem',
		fontWeight: 'bold'
	}

	return(
		<React.Fragment>
			<div style={playerStyle}>
				<h4>{name}</h4>
				<div style={pwucaStyle}>
					<p>{pwuca}</p>
				</div>
			</div>
		</React.Fragment>
	)
}

Player.propTypes = {
	name: PropTypes.string,
	pwuca: PropTypes.string
}

export default Player;