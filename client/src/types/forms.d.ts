import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister, UseFormTrigger } from 'react-hook-form'
import { z } from 'zod'

export type ControlType = 'checkbox' | 'text' | 'email' | 'password' | 'number' | 'pin' | 'radio' | 'range' | 'select' | 'switch' | 'textarea'

export type FormControl = {
	name: string
	labelText: string
	type: ControlType
	required?: boolean
	shouldValidate?: boolean
}

export type FormProps = {
	heading: string
	schema: z.AnyZodObject
	controls: Array<FormControl>
	onSubmit: (data: FieldValues) => Promise<void>
	defaultValues?: FieldValues
}

export type FormContentProps = Omit<FormProps, 'schema' | 'onSubmit'> & {
	onSubmit: SubmitHandler<FieldValues>
	loading: boolean
}

export type InputComponentProps = {
	controlData: FormControl
	register: UseFormRegister<FieldValues>
	errors: FieldErrors<FieldValues>
	trigger?: UseFormTrigger<FieldValues>
	useDefaultErrorMessage?: boolean
}

export type FormControlProps = {
	controlData: FormControl
	register: UseFormRegister<FieldValues>
	errors: FieldError<FieldValues>
	trigger: UseFormTrigger<FieldValues>
}
