import { As, ComponentWithAs } from '@chakra-ui/react'
import { RefCallBack } from 'react-hook-form'

export interface ComponentWithAsWithRef<Component extends As, Props extends object> extends ComponentWithAs<Component, Props & { innerref: RefCallBack }> {}
