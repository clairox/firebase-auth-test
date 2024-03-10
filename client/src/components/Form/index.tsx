import { Box, ButtonGroup, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import Button from '../Button'
import TextInput from './inputs/TextInput'
import { FormFieldProps, FormContentProps, FormField, FormProps } from '../../types/forms'

const Form: FunctionComponent<FormProps> = ({
	heading,
	schema,
	fields,
	onSubmit,
	defaultValues,
	validateOnChange = true,
	submissionErrorMessage,
}) => {
	const [loading, setLoading] = useState(false)

	const formMethods = useForm<FieldValues>({
		mode: validateOnChange ? 'onChange' : 'onSubmit',
		resolver: zodResolver(schema),
		delayError: 750,
		defaultValues,
	})

	const onFormSubmit: SubmitHandler<FieldValues> = data => {
		setLoading(true)
		onSubmit(data).then(() => setLoading(false))
	}

	return (
		<FormProvider {...formMethods}>
			<FormContent
				onSubmit={onFormSubmit}
				loading={loading}
				heading={heading}
				fields={fields}
				submissionErrorMessage={submissionErrorMessage}
			/>
		</FormProvider>
	)
}

const FormContent: FunctionComponent<FormContentProps> = ({
	heading,
	fields,
	onSubmit,
	loading,
	submissionErrorMessage,
}) => {
	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
	} = useFormContext<FieldValues>()

	return (
		<Center as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Flex direction="column" alignItems="center">
				<Heading size="2xl" mb="12">
					{heading}
				</Heading>
				{submissionErrorMessage && <Box>{submissionErrorMessage}</Box>}
				<VStack spacing="4" w="md">
					{fields.map((field: FormField) => (
						<Field key={field.name} fieldData={field} {...{ register, errors }} />
					))}
				</VStack>
				<ButtonGroup mt="8">
					<Button type="submit" isDisabled={!isValid} isLoading={loading} loadingText="Submitting">
						Submit
					</Button>
				</ButtonGroup>
			</Flex>
		</Center>
	)
}

const Field: FunctionComponent<FormFieldProps> = ({ fieldData, register, errors }) => {
	const { type } = fieldData

	if (type === 'text' || type === 'email' || type === 'password') {
		return <TextInput fieldData={fieldData} {...{ register, errors }} />
	}

	return <></>
}

export default Form
