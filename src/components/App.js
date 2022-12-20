import { db, auth } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import SignIn from './SignIn';
import BodyControl from './BodyControl';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile } from 'firebase/auth';
import { 
  doc,
  query,
  where,
  onSnapshot,
  addDoc,
  collection } from 'firebase/firestore';


function App(){

  const [player, setPlayer] = useState(null)
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
	const [user] = useAuthState(auth);
  
  useEffect(() => {
		if (user){
			const queryPlayer = query(collection(db, "players"), where("id", "==", auth.currentUser.uid));
			const unSubscribe = onSnapshot(queryPlayer, (docSnapshot) => {
				const currentPlayer = docSnapshot.data()
				setPlayer(currentPlayer);
			},
			(error) => {
				console.log("ruh roh (something bad is happening in setEffect)")
			})
			return () => unSubscribe;
		}
	}, {});

  const handleNewPlayer = async (event) => {
    event.preventDefault();
    const newPlayer = {
      name: auth.currentUser.displayName,
      pwuca: "",
      turnOrder: null,
      isTurn: false,
      id: auth.currentUser.uid,
      inRoom: false,
      currentRoom: null
    }
    await addDoc(collection(db, "Players"), newPlayer)
  }

  const handleLogOut = async (event) => {
    event.preventDefault();
    await signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    })
  }

	const registerEmailPass = async (event) => {
    event.preventDefault();
    const registerUserName = name
    const registerEmail = email;
    const registerPassword = password;
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: registerUserName
        })
      })
      .then((userCredential) => {
        handleNewPlayer(event);
      })
      .catch((error) => {
        setErrorCode(error.code);
        setErrorMessage(error.message);
      });
    setEmail("");
    setPassword("");
    setName("");
	}

  const userSignIn = async (event) => {
    event.preventDefault();
    const signInEmail = email;
    const signInPassword = password;
    await signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .then(() => {
        setErrorCode(null);
        setErrorMessage(null);
      })
      .catch((error) => {
        setErrorCode(error.code);
        setErrorMessage(error.message);
      })
    setEmail("");
    setPassword("");
    setName("");
  }

  const errorStyle = {
    color: "red",
    fontWeight: "bold"
  }

  let visibleBody;

  if (user === null){
    visibleBody =
    <React.Fragment>
      <Route path="/register" element={<CreateUser
        userName={name}
        userEmail={email}
        userPassword={password}
        setUserEmail={setEmail}
        setUserName={setName}
        setUserPassword={setPassword}
        onClickRegisterEmailPass={registerEmailPass}/>} />
      <Route path="/login" element={<SignIn
        userEmail={email}
        userPassword={password}
        setUserEmail={setEmail}
        setUserPassword={setPassword}
        onClickUserSignIn={userSignIn}/>} />
      <Route path="/" element ={<p>You have not registered</p>} />
    </React.Fragment> 
  } else {
    visibleBody =
    <React.Fragment>
      <Route path="/" element={<BodyControl userPlayer={player} setUserPlayer={setPlayer} />} />
      <Route path="/user-cp" element={<UserCP />} />
    </React.Fragment>
      
  }

	return(
			<Router>
        <Header logOut={handleLogOut} />
        <div style={errorStyle}>
          {errorCode != null ? <p> {errorCode}</p> : null}
          {errorMessage != null ? <p>{errorMessage}</p> : null}
        </div>
        <Routes> 
				  {visibleBody}
        </Routes>
			</Router>
	)
}

export default App;