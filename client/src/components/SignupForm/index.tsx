import FormWrapper from '../Form'
import SignupFormSchema from './schema'
import { useNavigate } from 'react-router-dom'
import { FieldValues } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { FormProps } from '../../types/forms'

const SignupForm = () => {
	const navigate = useNavigate()

	const onSubmit = async (data: FieldValues): Promise<void> => {
		try {
			const { email, password } = data
			await createUserWithEmailAndPassword(auth, email, password)

			navigate('/', { replace: true })
		} catch (err) {
			console.error(err)
		}
	}

	const formProps: FormProps = {
		heading: 'Sign Up',
		schema: SignupFormSchema,
		fields: [
			{
				name: 'email',
				labelText: 'Email *',
				type: 'email',
				required: true,
				shouldValidate: true,
			},
			{
				name: 'password',
				labelText: 'Password *',
				type: 'password',
				required: true,
				shouldValidate: true,
			},
		],
		onSubmit,
		defaultValues: { email: '', password: '' },
	}
	return <FormWrapper {...formProps} />
}

export default SignupForm
