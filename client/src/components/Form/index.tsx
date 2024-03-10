import { ButtonGroup, Center, Flex, Heading, VStack } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FunctionComponent, useState } from 'react'
import { FieldValues, FormProvider, SubmitHandler, useForm, useFormContext } from 'react-hook-form'
import Button from '../Button'
import PasswordInput from './inputs/PasswordInput'
import TextInput from './inputs/TextInput'
import { FormControlProps, FormContentProps, FormControl, FormProps } from '../../types/forms'

const Form: FunctionComponent<FormProps> = ({
	heading,
	schema,
	controls,
	onSubmit,
	defaultValues,
	validateOnChange = true,
	submissionErrorMessage,
}) => {
	const [loading, setLoading] = useState(false)

	const formMethods = useForm<FieldValues>({
		mode: validateOnChange ? 'onChange' : 'onSubmit',
		criteriaMode: 'all',
		resolver: zodResolver(schema),
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
				controls={controls}
				submissionErrorMessage={submissionErrorMessage}
			/>
		</FormProvider>
	)
}

const FormContent: FunctionComponent<FormContentProps> = ({
	heading,
	controls,
	onSubmit,
	loading,
	submissionErrorMessage,
}) => {
	const {
		register,
		formState: { isValid, errors },
		handleSubmit,
		trigger,
	} = useFormContext<FieldValues>()

	return (
		<Center as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
			<Flex direction="column" alignItems="center">
				<Heading size="2xl" mb="12">
					{heading}
				</Heading>
				{submissionErrorMessage}
				<VStack spacing="4" w="md">
					{controls.map((control: FormControl) => (
						<Control key={control.name} controlData={control} {...{ register, errors, trigger }} />
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

const Control: FunctionComponent<FormControlProps> = ({
	controlData,
	register,
	errors,
	trigger,
}) => {
	const { type } = controlData

	if (type === 'text' || type === 'email') {
		return <TextInput controlData={controlData} {...{ register, errors }} />
	}
	if (type === 'password') {
		return <PasswordInput controlData={controlData} {...{ register, errors, trigger }} />
	}

	return <></>
}

export default Form
