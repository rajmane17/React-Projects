import {useState, useContext} from 'react'
import UserContext from '../context/UserContext'

// Here we will be sending data
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {setUser} = useContext(UserContext);

    function handleSubmit(e){
        e.preventDefault();
        setUser({
            username: username,
            password: password
        })
    }

  return (
    <>
      <h2>Login</h2>
      <input 
      type="text"
      placeholder='username'
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      disabled = {false}
       />
       {" "}
      <input 
      type="text"
      placeholder='password'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      disabled = {false}
       />
       <button onClick={handleSubmit}>Submit</button>
    </>
  )
}

export default Login
