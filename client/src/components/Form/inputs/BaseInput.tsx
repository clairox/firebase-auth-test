import { FormControl, FormLabel } from '@chakra-ui/react'
import { FunctionComponent, ReactElement } from 'react'
import { InputComponentProps } from '../../../types/form'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Props = InputComponentProps & { children: (props: any) => ReactElement<any, any> | null }

const BaseInput: FunctionComponent<Props> = ({
	fieldData,
	register,
	errors,
	children,
	useDefaultErrorMessage = true,
}) => {
	const { name, labelText, placeholder, type } = fieldData
	const { ref, ...reg } = register(name, {})
	const error = errors[name]

	return (
		<FormControl>
			{labelText && <FormLabel htmlFor={name + 'Input'}>{labelText}</FormLabel>}
			{children({
				innerref: ref,
				...reg,
				type,
				id: name,
				placeholder,
				'aria-required': true,
			})}
			{useDefaultErrorMessage && error && fieldData.shouldValidate && (
				<div>{error.message as string}</div>
			)}
		</FormControl>
	)
}

export default BaseInput
