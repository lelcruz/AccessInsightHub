import React, { useState }  from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import {Link, useNavigate } from 'react-router-dom'
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import '../../Styles/login.scss'

function LoginPage() {
    const navigate = useNavigate();
    const directToRegister = () => {
        navigate('/register');
    };
    const directToMainPage = () => {
      navigate('/main');
    };

    //  -----------------------------------------BACKEND-----------------------------------------
    function AuthenticateUser() {
        signInWithEmailAndPassword(auth, login_email, login_password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    const [login_email, setEmail] = useState(""); 
    const [login_password, setPassword] = useState("");

    //  -----------------------------------------BACKEND-----------------------------------------
  return (
    <div className="login-body">
      <div className="login-header">
          <h2>Welcome Back</h2>
          <h5>Enter the information you entered while registering</h5>
      </div>

      <label htmlFor="username" className="form-check-label"> Email Address </label>
      <input type="text" placeholder="teamnamenotfound@gmail.com" value={login_email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>
      <label htmlFor="password" className="form-check-label">Password</label>
      <input type="password" placeholder="**********" value={login_password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>

        {/* Need href for the Forgot password anchor*/}
        <span style={{fontWeight: "bold", paddingBottom: "30px"}} className="text-end">Forgot password?</span>
        <BasicButtonComponent title={"Sign In"} onClick={AuthenticateUser}></BasicButtonComponent>
        <span className="formatted-text">or</span>
        <BasicButtonComponent title={"Register"} onClick={directToRegister}></BasicButtonComponent>
    <div className="bg-image"></div>
    </div>
  );
}
export default LoginPage;
 