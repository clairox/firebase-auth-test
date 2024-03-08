import { SubmitHandler, useFormContext } from 'react-hook-form'
import { LoginFormSchemaType } from './types/schema'
import { FunctionComponent } from 'react'

type LoginFormProps = {
	onSubmit: SubmitHandler<LoginFormSchemaType>
}

const LoginFormContent: FunctionComponent<LoginFormProps> = ({ onSubmit }) => {
	const { register, handleSubmit } = useFormContext<LoginFormSchemaType>()

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
			<button type="submit">Log In</button>
		</form>
	)
}

export default LoginFormContent
