/* eslint-disable no-unused-vars */
import { Routes, Route } from 'react-router-dom'
import {
  Home, Start, UserLogin, UserSignup, CaptionSignup, CaptionLogin, UserProtectedWrapper,
  UserLogout, CaptainDashboard, CaptainLogout,CaptainProtectedWrapper } from "./pages/index.js"
import { useContext } from 'react'
import { userDataContext } from './context/UserContext'
function App() {

  const data = useContext(userDataContext);

  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        } />
        {/* user routes */}
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/logout' element={<UserLogout />} />
        {/* captain routes */}
        <Route path='/captain-login' element={<CaptionLogin />} />
        <Route path='/captain-signup' element={<CaptionSignup />} />
        <Route path='/captain-logout' element={<CaptainLogout />} />
        <Route path='/captain-dashboard' element={
          <CaptainProtectedWrapper>
            <CaptainDashboard />
          </CaptainProtectedWrapper>
        } />
      </Routes>
    </>
  )
}

export default App
