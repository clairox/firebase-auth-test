import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'

const App = () => {
	return (
		<Routes>
			<Route index element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	)
}

export default App
