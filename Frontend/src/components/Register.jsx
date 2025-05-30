import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';

const Register = () => {
  const[username,setUsername]=useState('');
  const[password,setPassword]=useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const handleSubmit= async (e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:5000/register',{username,password})
      alert("Register Success");
      setUsername('');
      setPassword('')
      navigate('/login');
    }catch(error){
      console.error("Registration Failed",error)
       if (error.response && error.response.data && error.response.data.message) {
      alert(`Error: ${error.response.data.message}`);
    } else {
      alert("Registration failed. Please try again.");
    }
    }
  }
  return (
    <div className='register-container'>
      <h1>Register</h1>
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
        <button type='submit' className='submit-btn'>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login Here</Link></p>
      
    </div>
  )
}

export default Register
