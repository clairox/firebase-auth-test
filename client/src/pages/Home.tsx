import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../lib/firebase'
import { User } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { Box, ButtonGroup, Center, Flex, HStack, Heading, List, ListItem, Text } from '@chakra-ui/react'

const Home = () => {
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth)

	const shownUserProperties: (keyof User)[] = ['uid', 'email']

	if (loading) {
		return <Center>Loading...</Center>
	}

	if (error) {
		return <Center>Something went wrong.</Center>
	}

	if (user) {
		return (
			<Box>
				<Center>
					<Flex direction="column" align="left">
						<Heading mb="4">You are currently logged in!</Heading>
						<Text as="b" mb={['6', '6', '8']}>
							Your user data is listed below.
						</Text>
						<List spacing={4}>
							{Object.keys(user).map(key => {
								if (shownUserProperties.includes(key as keyof User)) {
									const keyText = key + ':'
									const valueText = Object(user)[key] || 'None'
									return (
										<ListItem key={key}>
											<HStack>
												<Text as="b" w="12">
													{keyText}
												</Text>
												<Text>{valueText}</Text>
											</HStack>
										</ListItem>
									)
								}
							})}
						</List>
					</Flex>
				</Center>
				<Center mt="8">
					<Button onClick={() => auth.signOut()}>Log Out</Button>
				</Center>
			</Box>
		)
	}

	return (
		<Box>
			<Heading as="h1" size={['2xl', '2xl', '3xl']} mb="8">
				<Text align="center">Welcome to Firebase Auth Test</Text>
			</Heading>
			<Center>
				<Text>
					Click the <strong>Sign Up</strong> button to create a new account or the <strong>Log In</strong> button to log into an existing one.
				</Text>
			</Center>
			<Center>
				<ButtonGroup spacing="4" mt="10">
					<Button onClick={() => navigate('/signup')}>Sign Up</Button>
					<Button onClick={() => navigate('/login')}>Log In</Button>
				</ButtonGroup>
			</Center>
		</Box>
	)
}

export default Home
