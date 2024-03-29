import { FunctionComponent } from 'react'
import Input from '../../Input'
import BaseInput from './BaseInput'
import { InputComponentProps } from '../../../types/form'

const TextInput: FunctionComponent<InputComponentProps> = ({ fieldData, register, errors }) => {
	return (
		<BaseInput fieldData={fieldData} register={register} errors={errors}>
			{props => <Input {...props} />}
		</BaseInput>
	)
}

export default TextInput
