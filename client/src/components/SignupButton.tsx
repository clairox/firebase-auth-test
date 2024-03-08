import { useNavigate } from 'react-router-dom'
import Button from './Button'

const SignupButton = () => {
	const navigate = useNavigate()
	const signup = () => {
		navigate('/signup')
	}
	return <Button onClick={signup}>Sign Up</Button>
}

export default SignupButton
