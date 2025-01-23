/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom'
import { Home, Start, UserLogin, UserSignup, CaptionSignup, CaptionLogin, UserProtectedWrapper, UserLogout } from "./pages/index.js"
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
function App() {

  const data = useContext(userDataContext);

  return (
    <>
    <Routes>
      <Route path='/' element={<Start />}/>
      <Route path='/login' element={<UserLogin />}/>
      <Route path='/signup' element={<UserSignup />}/>
      <Route path='/caption-login' element={<CaptionLogin />}/>
      <Route path='/caption-signup' element={<CaptionSignup />}/>
      <Route path='/home' element={
        <UserProtectedWrapper>
        <Home />
        </UserProtectedWrapper>
      }/>
      <Route path='/logout' element={<UserLogout />}/>
    </Routes>
    </>
  )
}

export default App
