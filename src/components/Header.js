import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from './../firebase';

function Header(props){

	const user = auth.currentUser;

	const headerStyle = {
		borderBottom: '3px solid brown',
		width: '90vw',
		height: '15vh',
		margin: '20px',
		padding: '25px',
		color: 'brown',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
	const leftHeaderStyle = {
		margin: '20px',
		padding: '20px'

	}
	const userToolbarStyle = {
		margin: '20px',
		paddingRight: '120px'
	}

	let visibleHeader;

	if (user == null){
		visibleHeader = 
		<ul>
			<li>
				<Link to='/register'>Register an account</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	} else{
		visibleHeader = 
		<React.Fragment>
			<li>
				<Link to="/user-cp">Control Panel</Link>
			</li>
			<li>
				<Link onClick={props.logOut}>Log Out</Link>
			</li>
		</React.Fragment>
	} 

	return(
		<div style={headerStyle}>
			<div style={leftHeaderStyle}>
				<h2>PWUCA</h2>
			</div>
			<div style={userToolbarStyle}>
			{user != null ? <h4>Hello, {auth.currentUser.displayName}</h4> : null}
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
