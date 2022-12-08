import React from "react";
import PropTypes from 'prop-types';

function LetterInput(props){
	

	const inputStyle = {
		width:'35px',
		fontSize: '25px'
	}

	return (
		<React.Fragment>
				<input
					type='text'
					name='letter'
					style={inputStyle}
					maxLength='1'
					onChange={event => props.onInput(event)}/>
		</React.Fragment>
	)
}

LetterInput.propTypes = {
	onInput: PropTypes.func
}


export default LetterInput;
