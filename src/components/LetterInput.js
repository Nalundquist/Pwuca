import React from "react";
import PropTypes from 'prop-types';

function LetterInput(props){
	
	const {input, onInput} = props;

	const inputStyle = {
		width:'35px',
		length: '35px',
		fontSize: '25px'
	}

	return (
		<React.Fragment>
				<input
					type='text'
					name='letter'
					style={inputStyle}
					onChange={onInput}/>
		</React.Fragment>
	)
}

