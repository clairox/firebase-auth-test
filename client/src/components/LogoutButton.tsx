import { auth } from '../lib/firebase'
import Button from './Button'

const LogoutButton = () => {
	const logout = () => {
		auth.signOut()
	}

	return <Button onClick={logout}>Log Out</Button>
}

export default LogoutButton
