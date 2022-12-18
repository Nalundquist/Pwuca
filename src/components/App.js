import { auth } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import UserLogin from './UserLogin';
import NotFound from './NotFound';
import BodyControl from './BodyControl';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { 
  signOut, 
  createUserWithEmailAndPassword,
  updateProfile } from 'firebase/auth';


function App(){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [name, setName] = useState("");
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
    const registerEmail = email;
    const registerPassword = password;
    await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
	}

  

  let visibleBody;

  if (user === null){
    visibleBody =
    <React.Fragment>
      <Route path="/register" element={<CreateUser
        userName={name}	
        userEmail={email}
        userPassword={password}
        userConfirmPass={confirmPass}
        setUserConfirmPass={setConfirmPass}
        setUserEmail={setEmail}
        setUserName={setName}
        setUserPassword={setPassword}
        onClickRegisterEmailPass={registerEmailPass}/>} />
      <Route path="/login" element={<UserLogin />} />
    </React.Fragment> 
  } 

	return(
			<Router>
        <Header logOut={handleLogOut} />
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