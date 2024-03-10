import { FormControl, FormLabel } from '@chakra-ui/react'
import { FunctionComponent, ReactElement } from 'react'
import { InputComponentProps } from '../../../types/forms'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BaseInput: FunctionComponent<InputComponentProps & { children: (props: any) => ReactElement<any, any> | null }> = ({
	controlData,
	register,
	errors,
	trigger,
	children,
	useDefaultErrorMessage = true,
}) => {
	const { name, labelText, type } = controlData
	const { ref, ...reg } = register(name, {})
	const controlError = errors[name]

	return (
		<FormControl>
			<FormLabel htmlFor={name + 'Input'}>{labelText}</FormLabel>
			{children({ innerref: ref, ...reg, type, id: name, 'aria-required': true, onFocus: trigger && (() => trigger(name)) })}
			{useDefaultErrorMessage && controlError && controlData.shouldValidate && <div>{controlError.message as string}</div>}
		</FormControl>
	)
}

export default BaseInput
