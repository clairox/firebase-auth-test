import Button from './Button'

const LoginButton = () => {
	const login = () => {
		console.log('logging in')
	}
	return <Button onClick={login}>Log In</Button>
}

export default LoginButton
