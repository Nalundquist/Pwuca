import React from "react";
import PropTypes from 'prop-types';

function Word(props){
	return(
		<h1>{props.wordDisplay}</h1>
	)
}

Word.PropTypes = {
	wordDisplay: PropTypes.string
}

export default Word;