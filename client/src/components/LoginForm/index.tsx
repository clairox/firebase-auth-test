import FormWrapper from '../Form'
import LoginFormSchema from './schema'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { FormProps } from '../../types/forms'
import { useState } from 'react'

const LoginForm = () => {
	const navigate = useNavigate()
	const [submissionErrorMessage, setSubmissionErrorMessage] = useState('')

	const onSubmit = async (data: FieldValues): Promise<void> => {
		setSubmissionErrorMessage('')

		try {
			const { email, password } = data
			await signInWithEmailAndPassword(auth, email, password)

			navigate('/', { replace: true })
		} catch (err) {
			const message = 'Login unsuccessful. Please verify your email and password and try again.'
			setSubmissionErrorMessage(message)
		}
	}

	const formProps: FormProps = {
		heading: 'Log In',
		schema: LoginFormSchema,
		controls: [
			{
				name: 'email',
				labelText: 'Email *',
				type: 'email', // validate as text field
				required: true,
				shouldValidate: false,
			},
			{
				name: 'password',
				labelText: 'Password *',
				type: 'password',
				required: true,
				shouldValidate: false,
			},
		],
		onSubmit,
		defaultValues: { email: '', password: '' },
		validateOnChange: false,
		submissionErrorMessage,
	}
	return <FormWrapper {...formProps} />
}

export default LoginForm
