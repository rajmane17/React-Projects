/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import {userDataContext} from "../context/UserContext.jsx";


const UserSignup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userData, setUserData] = useState({});

    const navigate = useNavigate();

    const [user, setUser] = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signin`, newUser);

    if(response.status === 201){
      const data = response.data;
      console.log(data);
      setUser(data.user);
      navigate('/home');
    }
    setEmail('');
    setPassword('');
  }


  return (
    <>
      <form onSubmit={handleSubmit} >
        <h2 className='text-lg font-medium mb-2' >Please enter your first name</h2>
        <input
          required
          type="text"
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <h2 className='text-lg font-medium mb-2' >Please enter your last name</h2>
        <input
          required
          type="text"
          className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
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
        >signup</button>
      </form>
    </>
  )
}

export default UserSignup
