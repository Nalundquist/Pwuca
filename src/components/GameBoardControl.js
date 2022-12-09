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
	const [challengingPlayer, setChallengingPlayer] = useState(null);
	const [challengingPlayerName, setChallengingPlayerName] = useState(null);
	const [challengedPlayer, setChallengedPlayer] = useState(null);
	const [challengeOne, setChallengeOne] = useState(false);
	const [challengeTwo, setChallengeTwo] = useState(false);
	const [challengeWait, setChallengeWait] = useState(false);
	const [isWord, setIsWord] = useState(null);


	const onInputChallenging = (event) => {
		setChallengingPlayerName(event.target.value);
	}

	const handleChallengeOne = () => {
		const thisChallenged = 
			playerList.filter(player => player.turnOrder === (turn - 1 ))[0];
		const thisChallenging = 
			playerList.filter(player => player.name === challengingPlayerName)[0];
		setChallengedPlayer(thisChallenged);
		setChallengingPlayer(thisChallenging);
		setChallengeOne(true);
		setChallengeWait(true);
	}

	const handleChallengeTwo = () => {
		const thisChallenged = 
			playerList.filter(player => player.turnOrder === (turn - 1 ))[0];
		const thisChallenging = 
			playerList.filter(player => player.name === challengingPlayerName)[0];
		setChallengedPlayer(thisChallenged);
		setChallengingPlayer(thisChallenging);
		setChallengeTwo(true);
	}

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
	} 

	const handleFirstLetter = () => {
		setWord(userLetter);
		handleCurrentPlayer(turn);
		setUserLetter('')
	}

	const handleWordChangeStart = () => {
		const newWord = userLetter + word;
		setWord(newWord);
		handleCurrentPlayer(turn);
		setUserLetter('')
	}

	const handleWordChangeEnd = () => {
		const newWord = word + userLetter;
		setWord(newWord);
		handleCurrentPlayer(turn);
		setUserLetter('')
	}

  const container = {
		display: 'flex',
		flexDirection: 'row'
	}
	const boardStyle = {
		width: '70%',
		padding: '30px'
	}

	let visibleWord;
	let currentPlayerView;
	let currentButton;
	let inputElementVisible;
	let challengePrompt;
	let challengeButton;

	if (currentPlayer === null){
		handleCurrentPlayer(turn);
	} else {
		if (word === null){
			inputElementVisible = <LetterInput onInput={handleLetterInput} />
			currentButton = <button onClick={handleFirstLetter}>Add Letter</button>
			currentPlayerView = <h4>{currentPlayer.name}'s Turn</h4>
		} else if (challengeOne){
			if (challengeWait){
			currentPlayerView = 
			<div>
				<h3>{challengingPlayer.name} has challenged {challengedPlayer.name}</h3>
				<p>They insist that {word} is in the dictionary.  Please wait while we check...</p>
			</div>
			} else {
				if (isWord = true) {
					<div>
						<h3>{challengedPlayer.name} has lost the challenge as {word} is indeed a word.</h3>
						<p>Their score is now {challengedPlayer.pwuca}</p>
					</div>
				} else {
					<div>
						<h3>{challengingPlayer.name} has lost the challenge as {word} is not a word!</h3>
						<p>Their score is now {challengingPlayer.pwuca}</p>
					</div>
				}
			}
		} else {
			inputElementVisible = <LetterInput onInput={handleLetterInput} />
			currentButton = 
			<div>
				<button onClick={handleWordChangeStart}>Add Letter to Start</button> 
				<h3>OR</h3>
				<button onClick={handleWordChangeEnd}>Add Letter to End</button>
			</div>
			currentPlayerView = <h4>{currentPlayer.name}'s Turn</h4>
		}
	}
	if (word != null){
		if (word.length < 4){
			challengePrompt = null
			challengeButton = null
		} else if (word.length > 3) {
			challengePrompt = 
			<input
				type='name'
				name='challenger'
				placeholder='Who is Challenging?'
				onChange={event => onInputChallenging(event)} />
			challengeButton = 
				<div>
					<button
					onClick={handleChallengeOne} >That is a word!</button><br />
					<p><strong>OR</strong></p>
					<button onClick={handleChallengeTwo} >There is no word that contains that!</button>
				</div>
		} else if (challengeOne || challengeTwo){

		}
	}
	return (
		<React.Fragment>
			<div style={container}>
				<div style={boardStyle}>
					{word === null ? null : <Word wordDisplay={word}/>}
					{currentPlayerView}
					{inputElementVisible}
					{currentButton}
					{challengePrompt}
					{challengeButton}
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