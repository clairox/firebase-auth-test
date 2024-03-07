import { FunctionComponent, ReactNode } from 'react'

type ButtonProps = {
	onClick: () => void
	children: ReactNode
}

const Button: FunctionComponent<ButtonProps> = ({ onClick, children }) => {
	return <button onClick={onClick}>{children}</button>
}

export default Button
