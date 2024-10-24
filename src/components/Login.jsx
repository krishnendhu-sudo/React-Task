import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/Login.css'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username, 
        password
      });

      navigate('/products')

      console.log('res',response.data); 
    } catch (error) {
      setErrorMessage('Login failed. Please try again.',error);
    }
  };

  return (
    <div className='loginPage'>
     <div className='loginContainer'>
      <h2>Login</h2>
      <div className='loginFields'>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

    </div>
      <button onClick={handleLogin}>Continue</button>
      {errorMessage && <p>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
