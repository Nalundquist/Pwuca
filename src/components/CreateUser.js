import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function CreateUser(props){

	const {
		userName,
		userEmail,
		userPassword,
		onClickRegisterEmailPass,
		setUserPassword,
		setUserEmail,
		setUserName } = props;

	const registerStyle = {
		position: 'relative',
		top: '50px',
		left: '35%',
		border: '2px solid brown',
		padding: '20px',
		height: '50vh',
		width: '45vw',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}

	const registerFormStyle = {
		display: 'flex',
		flexDirection: 'column',
		textAlign: 'center'
	}

	const textBoxStyle = {
		padding: '7px',
		marginBottom: '8px'
	}

	return(
		<div style={registerStyle}>
			<h3>Register a New Account</h3>
			<div style={registerFormStyle}>
				<input
					type="text"
					style={textBoxStyle}
					value={userName}
					onChange={(e) => setUserName(e.target.value)}
					placeholder="Username" />
				<input
					type="text"
					style={textBoxStyle}
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					placeholder="Email Address" />
				<input
					type="password"
					style={textBoxStyle}
					value={userPassword}
					onChange={(e) => setUserPassword(e.target.value)}
					placeholder="Input Password" />
				<button 
					onClick={onClickRegisterEmailPass}
					usenavigate="/">Register Account</button>
			</div>
		</div>
	)
}

CreateUser.propTypes = {
	userName: PropTypes.string,
	userPassword: PropTypes.string,
	userEmail: PropTypes.string,
	setUserName: PropTypes.func,
	setUserEmail: PropTypes.func,
	setUserPassword: PropTypes.func,
	onClickRegisterEmailPass: PropTypes.func
}

export default CreateUser;