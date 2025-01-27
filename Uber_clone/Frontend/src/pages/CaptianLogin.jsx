
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, {
        email,
        password
      });

      localStorage.setItem('captainToken', response.data.captainToken);
      setCaptainData(response.data.captain);
      

      navigate('/captain-dashboard');
    } catch (err) {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            setError('Incorrect email or password');
            break;
          case 404:
            setError('Captain account not found');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('Login failed. Please try again.');
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
          alt="Captain Login"
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <h3 className='text-lg font-medium mb-2'>Email Address</h3>
          <input
            required
            type="email"
            placeholder="email@example.com"
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />

          <h3 className='text-lg font-medium mb-2'>Password</h3>
          <input
            required
            type="password"
            placeholder="password"
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />

          <button
            type="submit"
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg'
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <p className='text-center'>
            Don't have an account? <Link to='/captain-signup' className='text-blue-600'>Create here</Link>
          </p>
          <p className='text-center mt-2'>
            <Link to='/login' className='text-blue-600'>Signin as user</Link>
          </p>
        </form>
      </div>

      <div className='mt-6'>
        <p className='text-[10px] text-center leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default CaptainLogin;