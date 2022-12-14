import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
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
						<Link to='/user-control'>Register an account</Link>
					</li>
					<li>
						<Link to='/user-control'>Login</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Header;
