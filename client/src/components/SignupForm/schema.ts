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

const transformPasswordWithErrors = (password: string) => {
	const errors = []
	if (password.length < 8) {
		errors.push('0')
	}
	if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
		errors.push('1')
	}
	if (!/\d/.test(password)) {
		errors.push('2')
	}
	if (!/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password)) {
		errors.push('3')
	}

	return { password, errors }
}

const SignupFormSchema = z.object({
	email: z
		.string()
		.email('Please enter a valid email address')
		.min(1, { message: 'Email address is required' })
		.max(128, { message: 'Email must not exceed 128 characters' })
		.refine(isEmailAvailable, { message: 'Email address already in use' }),
	password: z
		.string()
		.transform(transformPasswordWithErrors)
		.refine(
			value => value.errors.length === 0,
			value => ({ message: value.errors.join('') })
		)
		.transform(value => value.password),
})

export default SignupFormSchema
