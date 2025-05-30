import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const[error,setError]=useState('');
  const [showPassword, setShowPassword] = useState(false);


  const navigate=useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    setError('');
      if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    try{
      const response= await axios.post('http://localhost:5000/login',{username,password})
      localStorage.setItem('token',response.data.token)
      navigate('/dashboard');

    }catch(error){
      console.error("Login Failed", error);
        if (error.response && error.response.data) {
      const msg = error.response.data.message || 'Login failed';
      setError(msg);
      alert(`Login failed: ${msg}`);
    } else {
      const msg = 'Something went wrong. Please try again later.';
      setError(msg);
      alert(msg);
    }
    }
  }
  return (
    <div className='register-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input type="text" placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)} className="input-field" />  
        <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} className="input-field" /> 
        <label>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        /> Show Password
      </label> 
        <button type='submit' className='submit-btn'>Login</button>
      </form>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      
    </div>
  )
}

export default Login
