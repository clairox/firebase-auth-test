import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormSchemaType } from './types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginFormSchema from './utils/schema'
import Form from './Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useNavigate } from 'react-router-dom'

const LoginFormWrapper = () => {
	const navigate = useNavigate()

	const formMethods = useForm<LoginFormSchemaType>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: 'hakm.simmons@gmail.com',
			password: 'testpassword',
		},
	})

	const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data): Promise<void> => {
		try {
			const { email, password } = data

			await signInWithEmailAndPassword(auth, email, password)
			navigate('/', { replace: true })
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<FormProvider {...formMethods}>
			<Form onSubmit={onSubmit} />
		</FormProvider>
	)
}

export default LoginFormWrapper
