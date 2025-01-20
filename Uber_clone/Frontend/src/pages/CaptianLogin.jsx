/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link } from "react-router-dom";

const CaptianLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captionData, setCaptionData] = useState({});
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setCaptionData({
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
        {/* <Link to="/caption-sigin"> Create new account</Link> */}
        <Link to="/login">signin as user</Link>
      </form>
    </>
  )
}

export default CaptianLogin
