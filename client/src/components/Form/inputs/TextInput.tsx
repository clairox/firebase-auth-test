import { FunctionComponent } from 'react'
import Input from '../../Input'
import BaseInput from './BaseInput'
import { InputComponentProps } from '../../../types/forms'

const TextInput: FunctionComponent<InputComponentProps> = ({ controlData, register, errors }) => {
	return (
		<BaseInput controlData={controlData} register={register} errors={errors}>
			{props => <Input {...props} />}
		</BaseInput>
	)
}

export default TextInput
