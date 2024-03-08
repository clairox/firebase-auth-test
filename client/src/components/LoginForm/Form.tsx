import { SubmitHandler, useFormContext } from 'react-hook-form'
import { LoginFormSchemaType } from './types/schema'
import { FunctionComponent } from 'react'
import { ButtonGroup, Center, FormControl, FormLabel, Heading, VStack } from '@chakra-ui/react'
import Button from '../Button'
import Input from '../Input'

type LoginFormProps = {
	onSubmit: SubmitHandler<LoginFormSchemaType>
	loading: boolean
}

const Form: FunctionComponent<LoginFormProps> = ({ onSubmit, loading }) => {
	const { register, handleSubmit } = useFormContext<LoginFormSchemaType>()

	const { ref: emailRef, ...emailRegister } = register('email', { required: true })
	const { ref: passwordRef, ...passwordRegister } = register('password', { required: true })

	return (
		<Center as="form" w="100%" onSubmit={handleSubmit(onSubmit)}>
			<VStack spacing="4" w="md">
				<Heading size="2xl" mb="8">
					Log In
				</Heading>
				{/* Email Input */}
				<FormControl>
					<FormLabel htmlFor="email-input">Email *</FormLabel>
					<Input {...emailRegister} innerref={emailRef} type="email" id="email" aria-required="true" />
				</FormControl>

				{/* Password Input  */}
				<FormControl>
					<FormLabel htmlFor="passwordInput">Password *</FormLabel>
					<Input {...passwordRegister} innerref={passwordRef} type="password" id="password" aria-required="true" />
				</FormControl>
				<ButtonGroup mt="8">
					<Button type="submit" isLoading={loading} loadingText="Submitting">
						Submit
					</Button>
				</ButtonGroup>
			</VStack>
		</Center>
	)
}

export default Form
