import React, { useState, useEffect } from 'react';
import { auth, db } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import UserLogin from './UserLogin';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App(){

	const [loadingComponent, setLoadingComponent] = useState(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [name, setName] = useState("");
	const [user, loading, error] = useAuthState(auth);

	const registerEmailPass = async (name, email, password) => {
		try {
			const asyncReg = await createUserWithEmailAndPassword(auth, email, password);
			const thisUser = asyncReg.user;
			await addDoc(collection(db, "users"), {
				uid: thisUser.uid,
				name,
				authProvider: 'local',
				email
			});
		}	catch (error) {
			return(error);
		}
	}

	// let visiblePrompt;
	// let errorPrompt = <p>There has been an error: ${error}</p>;

	// if (loading) {
	// 	visiblePrompt = loadingComponent;
	// } else if (regError){
	// 	visiblePrompt = regError;
	// } else if (error){
	// 	visiblePrompt = errorPrompt;
	// } else {
	// 	visiblePrompt = null;
	// }

	return(
			<Router>
        <Header />
				{/* {visiblePrompt}
				{errorPrompt} */}
				<Routes>
					<Route path="/register" element={<CreateUser
						name={name}	
						email={email}
						password={password}
						confirmPass={confirmPass}
						setConfirmPass={setConfirmPass}
						setEmail={setEmail}
						setName={setName}
						setPassword={setPassword}
						registerEmailPass={registerEmailPass}/>} />
					<Route path="/userCP" element={<UserCP />} />
					<Route path="/login" element={<UserLogin />} />
				</Routes>
			</Router>
	)

}

export default App;