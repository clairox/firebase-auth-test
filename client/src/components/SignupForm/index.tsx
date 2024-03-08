import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SignupFormSchemaType } from './types/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import SignupFormSchema from './utils/schema'
import Form from './Form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../lib/firebase'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SignupFormWrapper = () => {
	const navigate = useNavigate()
	const [loading, setLoading] = useState(false)

	const formMethods = useForm<SignupFormSchemaType>({
		resolver: zodResolver(SignupFormSchema),
		defaultValues: {
			email: 'hakm.simmons@gmail.com',
			password: 'P4ssw@rd',
		},
	})

	const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data): Promise<void> => {
		setLoading(true)
		try {
			const { email, password } = data

			await createUserWithEmailAndPassword(auth, email, password)
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

export default SignupFormWrapper
