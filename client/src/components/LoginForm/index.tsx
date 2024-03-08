import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { LoginFormSchemaType } from './types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import LoginFormSchema from './utils/schema'
import Form from './Form'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const LoginFormWrapper = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const formMethods = useForm<LoginFormSchemaType>({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			email: 'hakm.simmons@gmail.com',
			password: 'testpassword',
		},
	})

	const onSubmit: SubmitHandler<LoginFormSchemaType> = async (data): Promise<void> => {
		setLoading(true)
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
			<Form onSubmit={onSubmit} loading={loading} />
		</FormProvider>
	)
}

export default LoginFormWrapper
