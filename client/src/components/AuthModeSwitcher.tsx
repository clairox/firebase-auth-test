import { useState } from 'react'
import { AuthMode } from '../types/form'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'

const AuthModeSwitcher = () => {
	const [authMode, setAuthMode] = useState<AuthMode>('login')

	const changeAuthMode = (mode: AuthMode) => {
		setAuthMode(mode)
	}

	if (authMode === 'login') {
		return <LoginForm setAuthMode={changeAuthMode} />
	} else {
		return <SignupForm setAuthMode={changeAuthMode} />
	}
}

export default AuthModeSwitcher
