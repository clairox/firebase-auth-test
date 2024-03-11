import FormWrapper from '../Form'
import LoginFormSchema from './schema'
import { FieldValues } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { AuthMode, FormProps } from '../../types/form'
import { FunctionComponent, useState } from 'react'
import { Link, Text } from '@chakra-ui/react'

type Props = { setAuthMode: (mode: AuthMode) => void }

const LoginForm: FunctionComponent<Props> = ({ setAuthMode }) => {
	const [submissionErrorMessage, setSubmissionErrorMessage] = useState('')

	const onSubmit = async (data: FieldValues): Promise<void> => {
		setSubmissionErrorMessage('')

		try {
			const { email, password } = data
			signInWithEmailAndPassword(auth, email, password)
		} catch (err) {
			const message = 'Login unsuccessful. Please verify your email and password and try again.'
			setSubmissionErrorMessage(message)
		}
	}

	const formProps: FormProps = {
		heading: 'Log In',
		schema: LoginFormSchema,
		fields: [
			{
				name: 'email',
				type: 'email', // validate as text field
				placeholder: 'Email',
				required: true,
				shouldValidate: false,
			},
			{
				name: 'password',
				type: 'password',
				placeholder: 'Password',
				required: true,
				shouldValidate: false,
			},
		],
		onSubmit,
		defaultValues: { email: '', password: '' },
		additionalContent: (
			<Text>
				Don't have an account? <Link onClick={() => setAuthMode('signup')}>Sign up</Link>.
			</Text>
		),
		validateOnChange: false,
		submissionErrorMessage,
	}
	return <FormWrapper {...formProps} />
}

export default LoginForm
