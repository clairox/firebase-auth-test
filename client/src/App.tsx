import { useAuthState } from 'react-firebase-hooks/auth'
import './App.css'
import { auth } from './lib/firebase'
import { User } from 'firebase/auth'
import { Box, Center, Grid, GridItem } from '@chakra-ui/react'
import UserInfo from './components/UserInfo'
import Hero from './components/Hero'
import AuthModeSwitcher from './components/AuthModeSwitcher'
import Layout from './layouts/Layout'

const App = () => {
	const [user, loading] = useAuthState(auth)

	const shownUserProperties: (keyof User)[] = ['providerId', 'uid', 'email']

	if (loading) {
		return (
			<Layout>
				<Center>Loading...</Center>
			</Layout>
		)
	}

	return (
		<Layout>
			<Center>
				<Grid templateColumns="1.4fr 1fr" gap="20" w="full" h="xs" maxW="1000px">
					<GridItem w="full">
						{user ? <UserInfo user={user} shownUserProperties={shownUserProperties} /> : <Hero />}
					</GridItem>
					<GridItem w="full">{user ? <Box w="full"></Box> : <AuthModeSwitcher />}</GridItem>
				</Grid>
			</Center>
		</Layout>
	)
}

export default App
