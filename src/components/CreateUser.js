import React, { useState, useEffect, useContext } from 'react';
import { auth } from './../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom'

function CreateUser(props){

	// const [regError, setRegError] = useState(null);
	// const [loadingComponent, setLoadingComponent] = useState(null);
	const [user, loading, error] = useAuthState(auth);
	const {
		name,
		email,
		password,
		confirmPass,
		registerEmailPass,
		setConfirmPass,
		setPassword,
		setEmail,
		setName } = props

	const registerStyle = {
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

	const registerFormStyle = {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	}

	const textBoxStyle = {
		padding: '7px',
		marginBottom: '8px'
	}

	return(

		<div style={registerStyle}>
			<h3>Register a New Account</h3>
			<div style={registerFormStyle}>
				<input
					type="text"
					style={textBoxStyle}
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Username" />
				<input
					type="text"
					style={textBoxStyle}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Email Address" />
				<input
					type="password"
					style={textBoxStyle}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Input Password" />
				<input
					type="password"
					style={textBoxStyle}
					value={confirmPass}
					onChange={(e) => setConfirmPass(e.target.value)}
					placeholder="Confirm Password" />
				<button onClick={registerEmailPass}>Register Account</button>
			</div>
		</div>
	)

}

export default CreateUser;