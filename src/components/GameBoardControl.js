import React, {useState, useEffect} from 'react';
import PlayersSidebar from './PlayersSidebar';
import Word from './Word';
import PropTypes from 'prop-types'
import LetterInput from './LetterInput'

function GameBoardControl(props){

	const [word, setWord] = useState(null);
	const [userLetter, setUserLetter] = useState(null);

	const handleLetterInput = (event) => {
		setUserLetter(event.target.value)
	} 

	const handleFirstLetter = () => {
		setWord(userLetter)
	}

	const handleWordChangeStart = () => {
		const newWord = userLetter + word;
		setWord(newWord)
	}

	const handleWordChangeEnd = () => {
		const newWord = word + userLetter;
		setWord(newWord);
	}
  const container = {
		display: 'flex',
		flexDirection: 'row'
	}
	const boardStyle = {
		width: '70%',
		padding: '30px'
	}

	let currentButton;
	let inputElementVisible;

  <LetterInput onInput={handleLetterInput} />
	if (word == null){
		inputElementVisible = <LetterInput onInput={handleLetterInput} />
		currentButton = <button onClick={handleFirstLetter}>Add Letter</button>
	} else {
		inputElementVisible = <LetterInput onInput={handleLetterInput} />
		currentButton = 
		<div>
			<button onClick={handleWordChangeStart}>Add Letter to Start</button> 
			<h3>OR</h3>
			<button onClick={handleWordChangeEnd}>Add Letter to End</button>
		</div>
	}
	console.log(props.playerList)
	return (
		<React.Fragment>
			<div style={container}>
				<div style={boardStyle}>
					{word == null ? null : <Word wordDisplay={word}/>}
					{inputElementVisible}
					{currentButton}
				</div>
				<PlayersSidebar players={props.playerList} />
			</div>
		</React.Fragment>
	)
}

GameBoardControl.propTypes = {
	playerList: PropTypes.array
}
export default GameBoardControl;