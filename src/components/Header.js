import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { auth, db } from './../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Header(props){

	const user = useAuthState(auth);

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

	if (user === null){
		visibleHeader = 
		<ul>
			<li>
				<Link to='/register'>Register an account</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	} else if (user != null){
		visibleHeader = 
		<React.Fragment>
			<li>
				<Link to="/user-cp">Your Control Panel</Link>
			</li>
			<li>
				<Link onClick={props.logOut}>Log Out</Link>
			</li>
		</React.Fragment>
	} else {
		visibleHeader = <p>error rendering</p>
	}
	return(
		<div style={headerStyle}>
			<div style={leftHeaderStyle}>
				<h2>PWUCA</h2>
			</div>
			<div style={userToolbarStyle}>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					{visibleHeader}
				</ul>
			</div>
		</div>
	)
}

export default Header;
