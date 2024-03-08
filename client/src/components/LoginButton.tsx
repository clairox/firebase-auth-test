import { useNavigate } from 'react-router-dom'
import Button from './Button'

const LoginButton = () => {
	const navigate = useNavigate()
	const login = () => {
		navigate('/login')
	}
	return <Button onClick={login}>Log In</Button>
}

export default LoginButton
