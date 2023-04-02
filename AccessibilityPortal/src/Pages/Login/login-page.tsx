import React from 'react';
import {Link, useNavigate } from 'react-router-dom'

function LoginPage() {

  const navigate = useNavigate();

  const directToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-body">
    
      <div className="login-header">
        <h3>Welcome Back</h3>
        <h5>Enter the information you entered while registering</h5>
      </div>

      <label>Email</label>
      <input></input>
      <label>Password</label>
      <input></input>
      <span>Forgot password?</span>


      <button className="button1">Sign in</button>
      <button onClick={directToRegister}>Register</button>
    </div>
  );
}
export default LoginPage;
