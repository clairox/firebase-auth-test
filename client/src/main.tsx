import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import themes from './themes/index.ts'

// TODO: add settings modal
// TODO: add change email, password, and delete account to settings
// TODO: add type to type imports
// TODO: make formcontent into form wrapped by formwrapper
// TODO: make call to /authorized
// TODO: show checkmark if authorized

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ChakraProvider theme={themes}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
