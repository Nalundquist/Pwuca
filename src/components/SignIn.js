import React, { useState } from 'react';
import PropTypes from 'prop-types';

function SignIn(props){
	
	const {
		userEmail,
		userPassword,
		onClickUserSignIn,
		setUserPassword,
		setUserEmail } = props;

	const signInStyle = {
		position: 'relative',
		top: '50px',
		left: '35%',
		border: '2px solid brown',
		padding: '20px',
		height: '50vh',
		width: '45vw',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}

	const signInFormStyle = {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	}

	const textBoxStyle = {
		padding: '7px',
		marginBottom: '8px'
	}

	return(
		<div style={signInStyle}>
			<h3>Sign In</h3>
			<div style={signInFormStyle}>
			<input
					type="text"
					style={textBoxStyle}
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					placeholder="Email Address" />
				<input
					type="password"
					style={textBoxStyle}
					value={userPassword}
					onChange={(e) => setUserPassword(e.target.value)}
					placeholder="Input Password" />
				<button 
					onClick={onClickUserSignIn}
					usenavigate="/">Sign In</button>
			</div>
		</div>
	)
}

SignIn.propTypes = {
	userPassword: PropTypes.string,
	userEmail: PropTypes.string,
	setUserEmail: PropTypes.func,
	setUserPassword: PropTypes.func,
	onClickUserSignIn: PropTypes.func
}

export default SignIn;