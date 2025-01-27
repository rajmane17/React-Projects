/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */

import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {CaptainDataContext} from "../context/CaptainContext"
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate();

  // captain's details
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  // captain's vehicle details
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const {captainData, setCaptainData} = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const captainData = {
      fullName: {
        firstName,
        lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plateNumber: vehiclePlate,
        capacity: vehicleCapacity,
        type: vehicleType
      }
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/signup`, captainData);
      console.log(response);
      
      localStorage.setItem('captainToken', response.data.captainToken);

      setCaptainData(response.data.captain)
      
      navigate('/captain-dashboard');
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 409:
            setError('Email already exists');
            break;
          case 400:
            setError('Invalid signup information');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('Signup failed. Please try again.');
        }
      } else if (err.request) {
        setError('No response from server. Check your internet connection.');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-5 px-5 min-h-screen flex flex-col justify-between container mx-auto max-w-md'>
      <div>
        <img
          className='w-20 mb-3 mx-auto'
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Captain Signup"
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <h3 className='text-lg w-full font-medium mb-2'>Captain's Name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              disabled={isLoading}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>Captain's Email</h3>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
            disabled={isLoading}
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            placeholder='password'
            disabled={isLoading}
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              disabled={isLoading}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              min="1"
              onChange={(e) => {
                // Ensure value is not less than 1
                const value = Math.max(1, parseInt(e.target.value) || 1);
                setVehicleCapacity(value.toString());
              }}
              disabled={isLoading}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              disabled={isLoading}
            >
              <option value="" disabled>Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Captain Account'}
          </button>
        </form>
        <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div className='mt-6'>
        <p className='text-[10px] text-center leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup