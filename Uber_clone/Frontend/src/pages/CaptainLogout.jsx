import { useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import {CaptainDataContext} from '../context/CaptainContext';
import axios from 'axios';
import { useEffect } from 'react';

function CaptainLogout() {
  const captainToken = localStorage.getItem('captainToken');
  const navigate = useNavigate();
  const { setCaptainData } = useContext(CaptainDataContext);

  useEffect(async()=> {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`, {
        headers: {
          'Authorization': `Bearer ${captainToken}`
        }
      })

      console.log(response.data);

      if(response.data.status == 200){
        //remove the token from local storage
        localStorage.removeItem('captainToken');
        setCaptainData(null);

        // redirect to captain-login page
        navigate('/captain-login');
      }
    } catch (error) {
      console.error(error);
    }
  }, [navigate, captainToken])

  return (
    <div>
      Logging out...
    </div>
  )
}

export default CaptainLogout
