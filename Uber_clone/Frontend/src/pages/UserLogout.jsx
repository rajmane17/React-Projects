/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogout() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }).catch((err) => {
      console.error("Logout failed", err);
    });
  }, [navigate, token]);

  return (
    <div>
      Logging out...
    </div>
  );
}

export default UserLogout;
