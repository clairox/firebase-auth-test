import Button from './Button'

const LogoutButton = () => {
	const logout = () => {
		console.log('logging out')
	}
	return <Button onClick={logout}>Log Out</Button>
}

export default LogoutButton
