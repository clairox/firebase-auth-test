import Button from './Button'

const SignupButton = () => {
	const signup = () => {
		console.log('signing up')
	}
	return <Button onClick={signup}>Sign Up</Button>
}

export default SignupButton
