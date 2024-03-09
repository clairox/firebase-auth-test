import FormWrapper from '../Form'
import LoginFormSchema from './schema'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'

const LoginForm = () => {
	const navigate = useNavigate()

	const onSubmit = async (data: FieldValues): Promise<void> => {
		try {
			const { email, password } = data
			await signInWithEmailAndPassword(auth, email, password)

			navigate('/', { replace: true })
		} catch (err) {
			console.error(err)
		}
	}

	const formProps: FormProps = {
		heading: 'Log In',
		schema: LoginFormSchema,
		controls: [
			{
				name: 'email',
				labelText: 'Email *',
				type: 'email',
				required: true,
			},
			{
				name: 'password',
				labelText: 'Password *',
				type: 'password',
				required: true,
			},
		],
		onSubmit,
		defaultValues: {
			email: 'hakm.simmons@gmail.com',
			password: 'testpassword',
		},
	}
	return <FormWrapper {...formProps} />
}

export default LoginForm
