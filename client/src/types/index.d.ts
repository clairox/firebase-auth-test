import { As, ComponentWithAs } from '@chakra-ui/react'
import { RefCallBack } from 'react-hook-form'

type FormFieldType = 'checkbox' | 'text' | 'email' | 'password' | 'number' | 'pin' | 'radio' | 'range' | 'select' | 'switch' | 'textarea'
interface ComponentWithAsWithRef<Component extends As, Props extends object> extends ComponentWithAs<Component, Props & { innerref: RefCallBack }> {}
