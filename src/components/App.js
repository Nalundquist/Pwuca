import { db, auth } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import SignIn from './SignIn';
import BodyControl from './BodyControl';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link,
  useNavigate,
  BrowserRouter as
    Router,
    Routes,
    Route } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  useEffect(() => {
		if (user != null){
			const queryPlayer = query(collection(db, "players"), where("userId", "==", auth.currentUser.uid));
			const unSubscribe = onSnapshot(queryPlayer, (docSnapshot) => {
				const currentPlayer = {
          name: docSnapshot.data().name,
          pwuca: docSnapshot.data().pwuca,
          turnOrder: docSnapshot.data().turnOrder,
          isTurn: docSnapshot.data().isTurn,
          userId: docSnapshot.data().userId,
          inRoom: false,
          currentRoom: null
        }
				setPlayer(currentPlayer);
			},
			(error) => {
				console.log("ruh roh (something bad is happening in setEffect)")
			})
			return () => unSubscribe();
		}
	}, []);

  const handleNewPlayer = async () => {
    console.log('in new player')
    const newPlayer = {
      name: auth.currentUser.displayName,
      pwuca: "",
      turnOrder: null,
      isTurn: false,
      userId: auth.currentUser.uid,
      inRoom: false,
      currentRoom: null
    }
    await setPlayer(newPlayer)
    await addDoc(collection(db, "Players"), newPlayer)
  }

  const handleLogOut = async (event) => {
    event.preventDefault();
    await signOut(auth).then(() => {
    }).catch((error) => {
      console.log(error);
    })
  }

  const updateUserName = async (name) => {
    await updateProfile(auth.currentUser, {
      displayName: name
    })
  }

	const registerEmailPass = async (event) => {
    event.preventDefault();
    const registerUserName = name;
    const registerEmail = email;
    const registerPassword = password;
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await ((userCredential) => {
        const user = userCredential.user;
      })
      await updateUserName(registerUserName);
      await handleNewPlayer();
      setEmail("");
      setPassword("");
      setName("");
      navigate('/');
    } catch (error) {
      setErrorCode(error.code);
      setErrorMessage(error.message);
    }
  };

  const userSignIn = async (event) => {
    event.preventDefault();
    const signInEmail = email;
    const signInPassword = password;
    try {
      signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      await ((userCredential) => {
        const user = userCredential.user;
      })
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
        setErrorCode(error.code);
        setErrorMessage(error.message);
    }
  }

  const pageContainer = {
    position: 'relative',
    width: '100%',
    height: '100%'
  }
  const errorStyle = {
    color: "red",
    fontWeight: "bold"
  }

  const notUserStyle = {
    border: '2px solid brown',
    padding: '15px',
    minHeight: '5vh',
    minWidth: '5vw',
    position: 'relative'
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
      <Route path="/" element ={
        <div style={notUserStyle}>
          <h3>Please</h3>
          <Link to='/register'>Register</Link>
          <h3>Or</h3>
          <Link to='/login'>Login</Link>
        </div>
      } />
    </React.Fragment> 
  } else {
    visibleBody =
    <React.Fragment>
      <Route path="/" element={<BodyControl userPlayer={player} />} />
      <Route path="/user-cp" element={<UserCP />} />
    </React.Fragment>
      
  }

	return(
    <div style={pageContainer}>
      <Header logOut={handleLogOut} />
      <div style={errorStyle}>
        {errorCode != null ? <p> {errorCode}</p> : null}
        {errorMessage != null ? <p>{errorMessage}</p> : null}
      </div>
      <Routes> 
        {visibleBody}
      </Routes>
    </div>
	)
}

export default App;