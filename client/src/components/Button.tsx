import { Button as Btn, ButtonProps, ComponentWithAs } from '@chakra-ui/react'

const Button: ComponentWithAs<'button', ButtonProps> = props => {
	return <Btn {...props} bg="blue.900" color="white" size="lg" _hover={{ bg: 'blue.1000' }} />
}

export default Button
