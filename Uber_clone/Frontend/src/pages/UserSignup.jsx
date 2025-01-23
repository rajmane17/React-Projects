import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext.jsx";

const UserSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(userDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setIsLoading(false);
      return;
    }

    const newUser = {
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, newUser);

      // Store token in localStorage
      localStorage.setItem('userToken', response.data.token);

      // Update user context
      setUser(response.data.user);

      // Navigate to home page
      navigate('/home');
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
    <div className="max-w-md mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            {error}
          </div>
        )}

        <div>
          <h2 className='text-lg font-medium mb-2'>First Name</h2>
          <input
            required
            type="text"
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <h2 className='text-lg font-medium mb-2'>Last Name</h2>
          <input
            required
            type="text"
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <h2 className='text-lg font-medium mb-2'>Email Address</h2>
          <input
            required
            type="email"
            placeholder="email@example.com"
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div>
          <h2 className='text-lg font-medium mb-2'>Password</h2>
          <input
            required
            type="password"
            placeholder="password"
            className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default UserSignup;