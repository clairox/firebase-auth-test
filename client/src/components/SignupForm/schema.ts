import { z } from 'zod'
import { isEmail, isLength } from 'validator'
import axios, { AxiosError } from 'axios'

const isEmailAvailable = async (email: string) => {
	const isValid = isEmail(email) && isLength(email, { max: 128 })
	// Skip email avaliablity check if email is invalid
	if (!isValid) {
		return true
	}

	const url = import.meta.env.VITE_SERVER_URL + '/user/exists'
	const config = {
		params: { email: email },
	}
	const userWithEmailExists = await axios
		.get(url, config)
		.then(response => {
			return response.data.exists
		})
		.catch((err: AxiosError) => {
			console.error(err)
		})

	return !userWithEmailExists
}

const SignupFormSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.max(128, { message: 'Email must not exceed 128 characters' })
		.refine(isEmailAvailable, { message: 'Email address already in use' }),
	password: z
		.string()
		.min(8, { message: 'Password must be a minimum of 8 characters' })
		.regex(new RegExp(/(?=.*[A-Z])(?=.*[a-z])/), {
			message: 'Password must have lowercase and capital letters',
		})
		.regex(new RegExp(/[0-9]/), { message: 'Password must have at least 1 number' })
		.regex(new RegExp(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/), {
			message: 'Password must have at least 1 special character',
		}),
})

export default SignupFormSchema
