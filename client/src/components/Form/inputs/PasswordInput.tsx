import { FunctionComponent, useState } from 'react'
import BaseInput from './BaseInput'
import Input from '../../Input'
import { List, ListIcon, ListItem } from '@chakra-ui/react'
import { InputComponentProps } from '../../../types/forms'

const PasswordInput: FunctionComponent<InputComponentProps> = ({ controlData, register, errors, trigger }) => {
	const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
	const controlErrorMessage = errors[controlData.name]?.message as string

	const onFocus = () => {
		trigger && trigger('password')
		setShowPasswordRequirements(true)
	}

	const onBlur = () => {
		setShowPasswordRequirements(false)
	}

	const passwordRequirements = ['A minimum of 8 characters', 'Capital and lowercase letters', 'At least 1 number', 'At least 1 special character']

	return (
		<BaseInput controlData={controlData} register={register} errors={errors} trigger={trigger} useDefaultErrorMessage={false}>
			{props => (
				<>
					<Input {...props} onFocus={onFocus} onBlur={onBlur} />
					{showPasswordRequirements && controlData.shouldValidate && (
						<List>
							{passwordRequirements.map((message, idx) => (
								<ListItem key={idx}>
									<ListIcon color={!controlErrorMessage?.includes(idx.toString()) ? 'green.500' : 'red.500'} />
									{message}
								</ListItem>
							))}
						</List>
					)}
				</>
			)}
		</BaseInput>
	)
}

export default PasswordInput
