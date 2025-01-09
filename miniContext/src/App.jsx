/* eslint-disable no-unused-vars */
import { useState } from 'react'
import Login from './components/Login'
import Profile from './components/Profile'
import UserContextProvider from './context/UserContextProvider'

function App() {
  const [count, setCount] = useState(0)

  // There is a possiblity if we are fetching data from an API
  // Then we can pass that response using useContext
  return (
    <UserContextProvider>
    <h1>Home Page</h1>
    <Login />
    <Profile />
    </UserContextProvider>
  )
}

export default App
