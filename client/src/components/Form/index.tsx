import { Box, ButtonGroup, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import Button from '../Button'
import TextInput from './inputs/TextInput'
import { FormFieldProps, FormContentProps, FormField, FormProps } from '../../types/form'

const Form: FunctionComponent<FormProps> = ({
	heading,
	schema,
	fields,
	onSubmit,
	defaultValues,
	additionalContent,
	validateOnChange = true,
	submissionErrorMessage,
}) => {
	const formMethods = useForm<FieldValues>({
		mode: validateOnChange ? 'onChange' : 'onSubmit',
		resolver: zodResolver(schema),
		delayError: 750,
		defaultValues,
	})

	const onFormSubmit: SubmitHandler<FieldValues> = data => {
		onSubmit(data)
	}

	return (
		<FormProvider {...formMethods}>
			<FormContent
				onSubmit={onFormSubmit}
				heading={heading}
				fields={fields}
				additionalContent={additionalContent}
				submissionErrorMessage={submissionErrorMessage}
			/>
		</FormProvider>
	)
}

const FormContent: FunctionComponent<FormContentProps> = ({
	heading,
	fields,
	onSubmit,
	additionalContent,
	submissionErrorMessage,
}) => {
	const {
		register,
		formState: { isValid, errors, isSubmitting },
		handleSubmit,
	} = useFormContext<FieldValues>()

	return (
		<Center as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Flex direction="column" alignItems="left" w="full" h="full">
				<Heading size="xl" mb="8" w="full">
					{heading}
				</Heading>
				{submissionErrorMessage && <Box>{submissionErrorMessage}</Box>}
				<VStack spacing="6" w="sm">
					{fields.map((field: FormField) => (
						<Field key={field.name} fieldData={field} {...{ register, errors }} />
					))}
				</VStack>
				<ButtonGroup mt="6">
					<Button
						type="submit"
						isDisabled={!isValid}
						isLoading={isSubmitting}
						loadingText="Submitting"
					>
						Submit
					</Button>
				</ButtonGroup>
				{additionalContent && <Box mt="5">{additionalContent}</Box>}
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
