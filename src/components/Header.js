import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Header(){

	// useEffect(){
	// 	if (user){
	// 		<p>do a thing</p>
	// 	}
	// }
	const headerStyle = {
		borderBottom: '3px solid brown',
		width: '100%',
		height: '10vh',
		padding: '25px',
		color: 'brown'
	}
	const leftHeaderStyle = {
		align: 'left'
	}
	const userToolbarStyle = {
		align: 'right'
	}
	return(
		<div style={headerStyle}>
			<div style={leftHeaderStyle}>
			<h2>PWUCA</h2>
			</div>
			<div style={userToolbarStyle}>
				<ul>
					<li>
						<Link to='/register'>Register an account</Link>
					</li>
					<li>
						<Link to='/login'>Login</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header;
