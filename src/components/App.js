import { auth, db } from './../firebase';
import CreateUser from './CreateUser';
import Header from './Header';
import UserCP from './UserCP';
import UserLogin from './UserLogin';
import NotFound from './NotFound';
import BodyControl from './BodyControl';
import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { 
  useAuthState, 
  getAuth,
  signOut,
  createUserWithEmailAndPassword
  } from 'react-firebase-hooks/auth';


function App(){

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPass, setConfirmPass] = useState("");
	const [name, setName] = useState("");
	const [user, loading, error] = useAuthState(auth);
  const thisAuth = getAuth();

  const handleLogOut = async () => {
    signOut(thisAuth).then(() => {
      console.log('sign out successful')
    }).catch((error) => {
      console.log('logout error')
    })
  }
  
	const registerEmailPass = async (name, email, password) => {
		try {
			const asyncReg = await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
        });
			const thisUser = asyncReg.user;
			await addDoc(collection(db, "users"), {
				uid: thisUser.uid,
				name: thisUser.name,
				authProvider: 'local',
				email: thisUser.email,
        password: thisUser.password
			});
		}	catch (error) {
			return(error);
		}
	}

  let visibleBody;

  if (!user){
    visibleBody =
    <React.Fragment>
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
      <Route path="/login" element={<UserLogin />} />
    </React.Fragment> 
  } else {
    visibleBody = <Route path="/" element={<BodyControl />} />
  }

	return(
			<Router>
        <Header logOut={handleLogOut} />
        <Routes> 
				  {visibleBody}
          {user ? <Route path="/userCP" element={<UserCP />} /> : null}
        </Routes>
			</Router>
	)

}

export default App;