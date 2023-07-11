import React, { useState } from 'react';
import authService from '../services/authService';
import httpService from '../services/httpService';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    try {
      const response = await httpService.post('/login', {email:email, password:password});
      let data=response.data;
      setResponseMessage(data.message);

      if (data.message === 'Enter Password') {
        // Additional input for password
        // Render password input component here
      } else if (data.message === 'Login Successful') {
        // Redirect to dashboard
        // You can use a routing library like react-router-dom for this
        authService.login({user:{email:email}});
        props.history.push('/dashboard');
      }
    } catch (error) {
      console.error(error);
      // Handle error here
    }
  };
  console.log(responseMessage, 'responseMessage');

  return (
    <div>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} /><br></br>
      {responseMessage === 'Enter Password' && (
        <><input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /><br></br></>
      )}
      <button onClick={handleLogin}>Login</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Login;
