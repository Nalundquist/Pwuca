import { auth } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import SignIn from './SignIn';
import UserLogin from './UserLogin';
import NotFound from './NotFound';
import BodyControl from './BodyControl';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  signOut, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile } from 'firebase/auth';


function App(){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
	const [user] = useAuthState(auth);

  const handleLogOut = async (event) => {
    event.preventDefault();
    await signOut(auth).then(() => {
      console.log('sign out successful')
      console.log(user);
    }).catch((error) => {
      console.log('logout error')
    })
  }

	const registerEmailPass = async (event) => {
    event.preventDefault();
    const registerUserName = name
    const registerEmail = email;
    const registerPassword = password;
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        setErrorCode(error.code);
        setErrorMessage(error.message);
      });
    await updateProfile(auth.currentUser, {
      displayName: registerUserName
    })
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
  } 

	return(
			<Router>
        <Header logOut={handleLogOut} />
        <div style={errorStyle}>
          {errorCode != null ? <p> {errorCode}</p> : null}
          {errorMessage != null ? <p>{errorMessage}</p> : null}
        </div>
          <p>{email}</p>
          <p>{password}</p>
        <Routes> 
				  {visibleBody}
          <Route path="/" element={<BodyControl />} />
          {user 
            ? <Route path="/user-cp" element={<UserCP />} />
            : <Route path="/not-found" element={<NotFound />} /> }
        </Routes>
			</Router>
	)
}

export default App;