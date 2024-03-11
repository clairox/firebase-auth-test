import { ReactNode } from 'react'
import { FieldErrors, FieldValues, SubmitHandler, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export type AuthMode = 'login' | 'signup'

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
	type: FieldType
	labelText?: string
	placeholder?: string
	required?: boolean
	shouldValidate?: boolean
}

export type FormProps = {
	heading: string
	schema: z.AnyZodObject
	fields: Array<FormField>
	onSubmit: (data: FieldValues) => Promise<void>
	defaultValues?: FieldValues
	additionalContent?: ReactNode
	validateOnChange?: boolean
	submissionErrorMessage?: string
}

export type FormContentProps = Omit<FormProps, 'schema' | 'onSubmit'> & {
	onSubmit: SubmitHandler<FieldValues>
	additionalContent?: ReactNode
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
