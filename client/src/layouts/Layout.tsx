import { Box } from '@chakra-ui/react'
import { FunctionComponent } from 'react'

type Props = { children: JSX.Element }

const Layout: FunctionComponent<Props> = ({ children }) => {
	return (
		<Box minH="100vh" bg="blue.700" color="white">
			<Box as="main" pt={['12', '16', '24']} px="5">
				{children}
			</Box>
		</Box>
	)
}

export default Layout
