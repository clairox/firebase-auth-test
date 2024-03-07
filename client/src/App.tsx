import { useEffect } from 'react'
import './App.css'
import { auth } from './lib/firebase'
import { EmailAuthProvider, reauthenticateWithCredential, User } from 'firebase/auth'
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useUpdatePassword, useSignOut, useDeleteUser } from 'react-firebase-hooks/auth'
import axios from 'axios'

function App() {
	const [user] = useAuthState(auth)

	useEffect(() => {
		const getAuthorized = async () => {
			if (user) {
				const idToken = await user.getIdToken()

				const url = 'http://127.0.0.1:8080/authorized'
				const config = {
					headers: {
						Authorization: idToken,
					},
				}

				axios
					.get(url, config)
					.then(response => {
						console.log(response.data)
					})
					.catch(err => {
						console.error(err)
					})
			}
		}

		getAuthorized()
	}, [user])
	return (
		<div>
			{user ? (
				<div>
					<p>Hello {user.email}!</p>
					<Logout />
					<ChangePassword user={user} />
					<ChangePasswordWithInvalidConfirmation user={user} />
					<Delete />
				</div>
			) : (
				<div>
					<Signup />
					<Login />
				</div>
			)}
		</div>
	)
}

const Signup = () => {
	const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth)

	const signup = (email: string, password: string) => {
		createUserWithEmailAndPassword(email, password)
	}
	return (
		<div>
			<button onClick={() => signup('hakm.simmons@gmail.com', 'testpassword')}>Sign Up as Hakeem</button>
		</div>
	)
}

const Login = () => {
	const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)

	const login = (email: string, password: string) => {
		signInWithEmailAndPassword(email, password)
	}
	return (
		<div>
			<button onClick={() => login('hakm.simmons@gmail.com', 'testpassword')}>Login as Hakeem</button>
		</div>
	)
}

const Logout = () => {
	const [signOut] = useSignOut(auth)

	return (
		<div>
			<button onClick={() => signOut()}>Logout</button>
		</div>
	)
}

const Delete = () => {
	const [deleteUser] = useDeleteUser(auth)

	return (
		<div>
			<button onClick={() => deleteUser()}>Delete Account</button>
		</div>
	)
}

type ChangePasswordProps = {
	user: User
}

const ChangePassword: React.FunctionComponent<ChangePasswordProps> = ({ user }) => {
	const [updatePassword] = useUpdatePassword(auth)
	const changePassword = async () => {
		try {
			const credential = EmailAuthProvider.credential('hakm.simmons@gmail.com', 'testpassword')

			reauthenticateWithCredential(user, credential).then(async () => {
				const success = await updatePassword('testpassword')
				if (success) console.log('Successfully changed password')
			})
		} catch (err) {
			console.error(err)
		}
	}
	return (
		<div>
			<button onClick={() => changePassword()}>Change Password to 'testpassword'</button>
		</div>
	)
}

const ChangePasswordWithInvalidConfirmation: React.FunctionComponent<ChangePasswordProps> = ({ user }) => {
	const [updatePassword] = useUpdatePassword(auth)
	const changePassword = async () => {
		try {
			const credential = EmailAuthProvider.credential('hakm.simmons@gmail.com', 'beanz!')

			reauthenticateWithCredential(user, credential).then(async () => {
				const success = await updatePassword('testpassword')
				if (success) console.log('Successfully changed password')
			})
		} catch (err) {
			console.log('Invalid password confirmation')
		}
	}
	return (
		<div>
			<button onClick={() => changePassword()}>Change Password to 'testpassword' with invalid password confirmation</button>
		</div>
	)
}

export default App
