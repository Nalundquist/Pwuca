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
  get,
  query,
  where,
  onSnapshot,
  addDoc,
  collection, 
  getDocs } from 'firebase/firestore';


function App(){

  const [player, setPlayer] = useState(null)
  const [playerId, setPlayerId] = useState("")
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
	const [user] = useAuthState(auth);
  const navigate = useNavigate();

  
  const handleNewPlayer = (UserCredential) => {
    const newPlayer = addDoc(collection(db, "Players"), {
      name: name,
      pwuca: "",
      turnOrder: null,
      isTurn: false,
      userId: UserCredential.user.uid,
      inRoom: false,
      currentRoom: null
    })
      .then((docRef) => {
        console.log(docRef.id);
        setPlayerId(docRef.id);
      })
    console.log(UserCredential);
    console.log(newPlayer);
    console.log(UserCredential);
    return newPlayer;
  }

  const handleSetPlayer = async (newPlayer) => {
    setPlayer(newPlayer.data());
    return "/";
  }

  const handleSetPlayerId = async (player) => {
    setPlayerId(player.id);
    console.log(player);
    console.log(player.id);
    return player;
  }
  
	const registerEmailPass = (event) => {
    event.preventDefault();
    const registerEmail = email;
    const registerPassword = password;
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((UserCredential) => 
        handleNewPlayer(UserCredential)
          .then((newPlayer) => 
            handleSetPlayer(newPlayer)
              .then((home) => 
              navigate(home)))
      )
      .catch((error) => {
        setErrorCode(error.code);
        setErrorMessage(error.message);
      });
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleSignInPlayer = async (id) => {
    console.log(id)
    const q = await query(collection(db, "Players"), where("userId", "==", id));
    console.log(q)
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      handleSetPlayerId(doc)
        .then((doc) => 
          handleSetPlayer(doc)
            .then((home) => 
              navigate(home)
              ))});
  };
  
  const userSignIn = async (event) => {
    event.preventDefault();
    const signInEmail = email;
    const signInPassword = password;
    signInWithEmailAndPassword(auth, signInEmail, signInPassword)
      .then((UserCredential) => 
        handleSignInPlayer(UserCredential.user.uid)
      )
      .catch ((error) =>{
        setErrorCode(error.code);
        setErrorMessage(error.message);
      });
    setEmail("");
    setPassword("");
  }

  const handleLogOut = async (event) => {
    event.preventDefault();
    await signOut(auth)
    .catch((error) => {
      console.log(error);
    });
    setPlayer(null)
    setPlayerId("")
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
      <Route path="/" element={<BodyControl userPlayer={player} userPlayerId={playerId}/>} />
      <Route path="/user-cp" element={<UserCP />} />
    </React.Fragment>
      
  }

	return(
    <div style={pageContainer}>
      <Header logOut={handleLogOut} headerPlayer={player} />
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