import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'

const Home = () => {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)

	const shownUserProperties: (keyof User)[] = ['uid', 'displayName', 'email', 'emailVerified']

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Something went wrong.</div>
	}

	if (user) {
		return (
			<div>
				{Object.keys(user).map(key => {
					if (shownUserProperties.includes(key as keyof User)) {
						const text = `${key}: ${Object(user)[key] || 'None'}`
						return <p key={key}>{text}</p>
					}
				})}
				<Button onClick={() => auth.signOut()}>Log Out</Button>
			</div>
		)
	}

	return (
		<div>
			<h1>Welcome to Firebase Auth Test</h1>
			<p>
				Click the <strong>Sign Up</strong> button to create a new account or the <strong>Log In</strong> button to log into an existing one.
			</p>
			<Button onClick={() => navigate('/signup')}>Sign Up</Button>
			<Button onClick={() => navigate('/login')}>Log In</Button>
		</div>
	)
}

export default Home
