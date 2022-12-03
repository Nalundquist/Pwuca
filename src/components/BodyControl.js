import StartPage from './StartPage';

function BodyControl(){
	const bodyStyle = {
		margin: '15px'
	}

	return(
		<div class={bodyStyle}>
			<StartPage />
		</div>
	)
}

export default BodyControl;