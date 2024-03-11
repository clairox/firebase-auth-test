import { Flex, Heading, Text } from '@chakra-ui/react'

const Hero = () => {
	return (
		<Flex direction="column" gap="5" w="full" h="full" pt="6">
			<Heading as="h1" size="2xl">
				firebase-auth-test v1
			</Heading>
			<Text>
				This app is a Firebase Authentication playground designed for testing and exploring
				authentication features.
			</Text>
			<Text>
				<strong>Log in</strong> or <strong>Sign up</strong> to get started.
			</Text>
		</Flex>
	)
}

export default Hero
