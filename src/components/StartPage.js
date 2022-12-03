import React from 'react'
// import '../index.css'

function StartPage(){
	const startStyle = {
		postion: 'absolute',
		top: '35%',
		left: '50%',
		textAlign: 'center'
	}
	return(
	<React.Fragment>
		<div style={startStyle}>
			<div id='titlefade'>
				<p>"You are new here,</p><p> I think.<hr/></p>
				<p>Many years ago</p><p>I used to live in this house...</p>	
			</div>
			<div id='newgamebox'>
				<p>An Amusement?</p>
				<button>Yes</button>
			</div>
		</div>
	</React.Fragment>
	)
}

export default StartPage;
