import FormWrapper from '../Form'
import SignupFormSchema from './schema'
import { FieldValues } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { AuthMode, FormProps } from '../../types/form'
import { Link, Text } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

type Props = { setAuthMode: (mode: AuthMode) => void }

const SignupForm: FunctionComponent<Props> = ({ setAuthMode }) => {
	const onSubmit = async (data: FieldValues): Promise<void> => {
		try {
			const { email, password } = data
			createUserWithEmailAndPassword(auth, email, password)
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
				type: 'email',
				placeholder: 'Email',
				required: true,
				shouldValidate: true,
			},
			{
				name: 'password',
				type: 'password',
				placeholder: 'Password',
				required: true,
				shouldValidate: true,
			},
		],
		onSubmit,
		defaultValues: { email: '', password: '' },
		additionalContent: (
			<Text>
				Already have an account? <Link onClick={() => setAuthMode('login')}>Log in</Link>.
			</Text>
		),
	}
	return <FormWrapper {...formProps} />
}

export default SignupForm
