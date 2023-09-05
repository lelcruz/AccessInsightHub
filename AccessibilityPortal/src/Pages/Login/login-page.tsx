import React from 'react';
import {Link, useNavigate } from 'react-router-dom'
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import '../../Styles/login.scss'

function LoginPage() {
    const navigate = useNavigate();
    const directToRegister = () => {
        navigate('/register');
    };
  return (
    <div className="login-body">
      <div className="login-header">
          <h2>Welcome Back</h2>
          <h5>Enter the information you entered while registering</h5>
      </div>

      <label>Email</label>
      <input></input>
      <label>Password</label>
      <input></input>
        {/* Need href for the Forgot password anchor*/}
        <span style={{fontWeight: "bold", paddingBottom: "30px"}} className="text-end">Forgot password?</span>
        <BasicButtonComponent title={"Sign In"}></BasicButtonComponent>
        <span className="formatted-text">or</span>
        <BasicButtonComponent title={"Register"} onClick={directToRegister}></BasicButtonComponent>
    <div className="bg-image"></div>
    </div>
  );
}
export default LoginPage;
 