import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export type FieldType =
	| 'checkbox'
	| 'text'
	| 'email'
	| 'password'
	| 'number'
	| 'pin'
	| 'radio'
	| 'range'
	| 'select'
	| 'switch'
	| 'textarea'

export type FormField = {
	name: string
	labelText: string
	type: FieldType
	required?: boolean
	shouldValidate?: boolean
}

export type FormProps = {
	heading: string
	schema: z.AnyZodObject
	fields: Array<FormField>
	onSubmit: (data: FieldValues) => Promise<void>
	defaultValues?: FieldValues
	validateOnChange?: boolean
	submissionErrorMessage?: string
}

export type FormContentProps = Omit<FormProps, 'schema' | 'onSubmit'> & {
	onSubmit: SubmitHandler<FieldValues>
	loading: boolean
	submissionErrorMessage?: string
}

export type InputComponentProps = {
	fieldData: FormField
	register: UseFormRegister<FieldValues>
	errors: FieldErrors<FieldValues>
	useDefaultErrorMessage?: boolean
}

export type FormFieldProps = {
	fieldData: FormField
	register: UseFormRegister<FieldValues>
	errors: FieldError<FieldValues>
}
