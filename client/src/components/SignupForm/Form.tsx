import { SubmitHandler, useFormContext } from 'react-hook-form'
import { SignupFormSchemaType } from './types/schema'
import { FunctionComponent } from 'react'

type SignupFormProps = {
	onSubmit: SubmitHandler<SignupFormSchemaType>
}

const Form: FunctionComponent<SignupFormProps> = ({ onSubmit }) => {
	const { register, handleSubmit } = useFormContext<SignupFormSchemaType>()

	return (
		<form className="form" onSubmit={handleSubmit(onSubmit)}>
			{/* Email Input */}
			<div className="form-group">
				<label className="form-label" htmlFor="email-input">
					Email address *
				</label>
				<input {...register('email', { required: true })} type="email" className="text-input" id="email" aria-required="true" autoFocus />
			</div>

			{/* Password Input  */}
			<div className="form-group">
				<label className="form-label" htmlFor="passwordInput">
					Password *
				</label>
				<input {...register('password', { required: true })} type="password" className="text-input" id="password" aria-required="true" />
			</div>
			<button type="submit">Sign Up</button>
		</form>
	)
}

export default Form
