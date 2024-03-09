import { ButtonGroup, Center, Flex, FormControl, FormLabel, Heading, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import Button from './Button'
import Input from './Input'

const Form: FunctionComponent<FormProps> = ({ heading, schema, controls, onSubmit, defaultValues }) => {
	const [loading, setLoading] = useState(false)

	const formMethods = useForm<FieldValues>({
		mode: 'onChange',
		resolver: zodResolver(schema),
		defaultValues,
	})

	const onFormSubmit: SubmitHandler<FieldValues> = data => {
		setLoading(true)
		onSubmit(data)
	}

	return (
		<FormProvider {...formMethods}>
			<FormContent onSubmit={onFormSubmit} loading={loading} heading={heading} controls={controls} />
		</FormProvider>
	)
}

const FormContent: FunctionComponent<FormContentProps> = ({ heading, controls, onSubmit, loading }) => {
	const { register, handleSubmit } = useFormContext<FieldValues>()

	const createFormControl = (fieldData: FormControl): JSX.Element => {
		const { name, labelText, type, required } = fieldData
		const { ref, ...reg } = register(name, { required })

		if (type === 'text' || type === 'email' || type === 'password') {
			return (
				<FormControl key={name}>
					<FormLabel htmlFor={name + 'Input'}>{labelText}</FormLabel>
					<Input {...reg} innerref={ref} type={type} id={name} aria-required />
				</FormControl>
			)
		} else {
			return <></>
		}
	}

	return (
		<Center as="form" onSubmit={handleSubmit(onSubmit)}>
			<Flex direction="column" alignItems="center">
				<Heading size="2xl" mb="12">
					{heading}
				</Heading>
				<VStack spacing="4" w="md">
					{controls.map((field: FormControl) => {
						return createFormControl(field)
					})}
				</VStack>
				<ButtonGroup mt="8">
					<Button type="submit" isLoading={loading} loadingText="Submitting">
						Submit
					</Button>
				</ButtonGroup>
			</Flex>
		</Center>
	)
}

export default Form
