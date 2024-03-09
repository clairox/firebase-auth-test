type ControlType = 'checkbox' | 'text' | 'email' | 'password' | 'number' | 'pin' | 'radio' | 'range' | 'select' | 'switch' | 'textarea'

type FormControl = {
	name: string
	labelText: string
	type: ControlType
	required?: boolean
}

type FormProps = {
	heading: string
	schema: z.AnyZodObject
	controls: Array<FormField>
	onSubmit: (data: FieldValues) => Promise<void>
	defaultValues?: FieldValues
}

type FormContentProps = Omit<FormProps, 'schema' | 'onSubmit'> & {
	onSubmit: SubmitHandler<FieldValues>
	loading: boolean
}
