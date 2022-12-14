import React, { useContext, useState } from 'react';
import { auth, db } from './../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function UserCP(){
	return (
		<p>User stuff</p>
	)
}

export default UserCP;