import { z } from 'zod'

const LoginFormSchema = z.object({
	email: z.string().email('Please enter a valid email address').min(1, { message: 'Email must not be empty' }).max(128, { message: 'Email must not exceed 128 characters' }),
	password: z.string().min(1, { message: 'Please enter a password' }),
})

export default LoginFormSchema
