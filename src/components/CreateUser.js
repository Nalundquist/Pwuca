import React, { useState, useEffect } from 'react';
import { auth } from './../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'

function CreateUser(){

	const [regError, setRegError] = useState(null);
	const [loadingComponent, setLoadingComponent] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [name, setName] = useState("");
	const [user, loading, error] = useAuthState(auth);
	const navigate = useNavigate();

	useEffect(() => {
		if (loading) 
			setLoadingComponent(
				<p>Loading...</p>
			);
			setTimeout(() => {
				return;
			}, 1000);
			setLoadingComponent(null);
		if (user) navigate('/userCP');
		if (
			password != "" &&
			confirmPass != "" &&
			password != confirmPass
		) setRegError(<p>Passwords must match.</p>);
	})

	const registerEmailPass = async (name, email, password) => {
		try {
			const asyncReg = await createUserWithEmailAndPassword(auth, email, password);
			const user = asyncReg.user;
			await addDoc(collection(db, "users"), {
				uid: user.uid,
				name,
				authProvider: 'local',
				email
			});
		}	catch (error) {
			setRegError(error);
		}
	}

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

	let visiblePrompt;

	if (loading) {
		visiblePrompt = loadingComponent;
	} else if (regError){
		visiblePrompt = regError;
	} else {
		visiblePrompt = null;
	}

	return(
		<div style={registerStyle}>
			{visiblePrompt}
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
					type="text"
					style={textBoxStyle}
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder="Input Password" />
				<input
					type="text"
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