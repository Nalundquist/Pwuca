function Header(){
	const headerStyle = {
		borderBottom: '3px solid brown',
		width: '100%',
		height: '10vh',
		padding: '25px',
		color: 'brown'
	}
	return(
		<div style={headerStyle}>
			<h2>PWUCA</h2>
		</div>
	)
}

export default Header;
