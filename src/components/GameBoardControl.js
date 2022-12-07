import React, {useState, useEffect} from 'react';
import PlayersSidebar from './PlayersSidebar';
import Word from './Word';
import PropTypes from 'prop-types'
import LetterInput from './LetterInput'

function GameBoardControl(props){

	const [word, setWord] = useState("");
	const [userLetter, setUserLetter] = useState("");

	const handleLetterInput = (event) => {
		setUserLetter(event.target.value)
	} 

  const container = {
		display: 'flex',
		flexDirection: 'row'
	}
	const boardStyle = {
		width: '70%',
		padding: '30px'
	}

	let wordElementVisible;
  const letterInputProp = <LetterInput onInput={handleLetterInput} />
	if (word.length < 1){
		wordElementVisible = {letterInputProp}
	}
	console.log(props.playerList)
	return (
		<React.Fragment>
			<div style={container}>
				<div style={boardStyle}>
					{wordElementVisible}
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