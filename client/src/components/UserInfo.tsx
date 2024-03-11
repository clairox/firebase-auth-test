import { Center, Code, Text, VStack } from '@chakra-ui/react'
import { User } from 'firebase/auth'
import Button from './Button'
import { auth } from '../lib/firebase'
import { FunctionComponent } from 'react'

type UserInfoProps = {
	user: User
	shownUserProperties: Array<keyof User>
}

const UserInfo: FunctionComponent<UserInfoProps> = ({ user, shownUserProperties }) => {
	return (
		<Code bg="blue.900" color="white" p="8" borderRadius="lg" w="full" h="full" fontSize="16">
			<VStack spacing="0.5" align="left">
				<Text>{'{'}</Text>
				{Object.keys(user).map(key => {
					if (shownUserProperties.length === 0 || shownUserProperties.includes(key as keyof User)) {
						return <Text pl="6">{`${key}: ${Object(user)[key] || 'None'}`}</Text>
					}
				})}
				<Text>{'}'}</Text>
			</VStack>
			<Center mt="8">
				<Button onClick={() => auth.signOut()}>Log Out</Button>
			</Center>
		</Code>
	)
}

export default UserInfo
