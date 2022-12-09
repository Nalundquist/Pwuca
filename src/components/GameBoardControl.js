import React, {useState, useEffect} from 'react';
import PlayersSidebar from './PlayersSidebar';
import Word from './Word';
import PropTypes from 'prop-types'
import LetterInput from './LetterInput'

function GameBoardControl(props){

	const {playerList} = props;
	const [word, setWord] = useState(null);
	const [userLetter, setUserLetter] = useState(null);
	const [currentPlayer, setCurrentPlayer] = useState(null);
	const [turn, setTurn] = useState(1);

	const handleCurrentPlayer = (turn) => {
		const thisPlayer = playerList.filter(player => player.turnOrder === turn)[0];
		setCurrentPlayer(thisPlayer);
		if (turn < playerList.length){
			setTurn(turn+1);
		} else {
			setTurn(1);
		}
	}

	const handleLetterInput = (event) => {
		setUserLetter(event.target.value)
		console.log(currentPlayer)
	} 

	const handleFirstLetter = () => {
		setWord(userLetter);
		handleCurrentPlayer(turn);
	}

	const handleWordChangeStart = () => {
		const newWord = userLetter + word;
		setWord(newWord);
		handleCurrentPlayer(turn);
	}

	const handleWordChangeEnd = () => {
		const newWord = word + userLetter;
		setWord(newWord);
		handleCurrentPlayer(turn);
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

	if (currentPlayer === null){
		handleCurrentPlayer(turn);
		console.log(currentPlayer)
	} else {
		if (word === null){
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
	}
	return (
		<React.Fragment>
			<div style={container}>
				<div style={boardStyle}>
					{word === null ? null : <Word wordDisplay={word}/>}
					{currentPlayer != null ? <h4>{currentPlayer.name}'s Turn</h4> : null}
					{inputElementVisible}
					{currentButton}
				</div>
				<PlayersSidebar players={playerList} activePlayer={currentPlayer} />
			</div>
		</React.Fragment>
	)
}

GameBoardControl.propTypes = {
	playerList: PropTypes.array
}
export default GameBoardControl;