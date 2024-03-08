import { z } from 'zod'

const SignupFormSchema = z.object({
	email: z.string().email('Please enter a valid email address').min(1, { message: 'Email must not be empty' }).max(128, { message: 'Email must not exceed 128 characters' }),
	password: z
		.string()
		.min(8, { message: 'Password must be a minimum of 8 characters' })
		.regex(new RegExp(/(?=.*[A-Z])(?=.*[a-z])/), { message: 'Must be a mix of lowercase and capital letters' })
		.regex(new RegExp(/[0-9]/), { message: 'Must contain at least 1 number' })
		.regex(new RegExp(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/), { message: 'Must contain at least 1 special character' }),
})

export default SignupFormSchema
