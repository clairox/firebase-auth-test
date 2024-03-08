import { ComponentWithAs, InputProps, Input as Ipt } from '@chakra-ui/react'
import { RefCallBack } from 'react-hook-form'

type Props = InputProps & {
	innerref: RefCallBack
}

const Input: ComponentWithAs<'input', Props> = props => {
	const { innerref, ...rest } = props
	return <Ipt {...rest} ref={innerref} variant="filled" bg="blue.900" borderWidth="thin" borderColor="blue.100" focusBorderColor="blue.300" _hover={{ bg: 'blue.1000' }} _focus={{ bg: 'blue.1000' }} />
}

export default Input
