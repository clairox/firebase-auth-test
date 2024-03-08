import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<Box minH="100vh" bg="blue.700" color="white">
			<Box as="main" pt={['10', '14', '20']} px="5">
				<Outlet />
			</Box>
		</Box>
	)
}

export default Layout
