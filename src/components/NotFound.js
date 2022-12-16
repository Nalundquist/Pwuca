import React from 'react';

function NotFound(){
	const notFoundStyle = {
		position: 'relative',
		width: '30%',
		top: '40%',
		left: '40%',
		border: '2px solid brown',
		padding: '15px'
	}

	return(
		<div style={notFoundStyle}>
			<h4>Page was not found</h4>
		</div>
	)
}

export default NotFound;