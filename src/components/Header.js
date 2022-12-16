import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { auth, db } from './../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header(props){

	const user = getAuthState(auth);

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

	let visibleHeader;

	if (!user){
		<ul>
			<li>
				<Link to='/register'>Register an account</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	} else {
		<ul>
			<li>
				<Link to="/userCP">Your Control Panel</Link>
				<button onClick={props.logOut}>Log Out</button>
			</li>
		</ul>
	}
	return(
		<div style={headerStyle}>
			<div style={leftHeaderStyle}>
				<h2>PWUCA</h2>
			</div>
			<div style={userToolbarStyle}>
				{visibleHeader}
			</div>
		</div>

	)
}

export default Header;
