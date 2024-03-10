import axios, { AxiosError } from 'axios'
import { z } from 'zod'

const email = z
	.string()
	.email('Please enter a valid email address')
	.min(1, { message: 'Email must not be empty' })
	.max(128, { message: 'Email must not exceed 128 characters' })
	.refine(
		async email => {
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
		},
		{ message: 'Email address already in use' }
	)

const password = z
	.string()
	.transform(password => {
		const errors = []
		if (password.length < 8) {
			errors.push('Password must be a minimum of 8 characters')
		}
		if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
			errors.push('Must be a mix of lowercase and capital letters')
		}
		if (!/\d/.test(password)) {
			errors.push('Must contain at least 1 number')
		}
		if (!/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password)) {
			errors.push('Must contain at least 1 special character')
		}

		return { password, errors }
	})
	.refine(
		value => value.errors.length === 0,
		value => {
			return { message: value.errors.join('|') }
		}
	)
	.transform(value => {
		return value.password
	})

const SignupFormSchema = z.object({
	email,
	password,
})

export default SignupFormSchema
