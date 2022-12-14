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
		if (loading) {
			setLoadingComponent(
				<p>Loading...</p>
			)
		}
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


}