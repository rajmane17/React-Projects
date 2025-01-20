/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({
      email: email,
      password: password
    })
    setEmail('');
    setPassword('');
  }

  return (
    <>
      <form onSubmit={handleSubmit} >
        <h2 className='text-lg font-medium mb-2' >Please enter your email address</h2>
        <input
        required
        type="email" 
        placeholder="email@example.com"
        className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />
        <h2 className='text-lg font-medium mb-2'>Please enter your password</h2>
        <input
          required
          type="password"
          placeholder="password"
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Login</button>
        <Link to="/signup"> Create new account</Link>
        <Link to="/caption-login">Signin as a caption</Link>
      </form>
    </>
  )
}

export default UserLogin
