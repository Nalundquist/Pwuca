import React, { useContext } from "react";
import { auth, db } from './../firebase';
import { useAuthState } from "react-firebase-hooks/auth";

function UserLogin(){
	return (
		<p>Here's where you log in</p>
	)
}

export default UserLogin;