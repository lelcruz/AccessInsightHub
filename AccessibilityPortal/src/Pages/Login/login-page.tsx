import React, { useState } from 'react';
import {useNavigate, Link} from "react-router-dom";
import { Button } from 'reactstrap';
import { auth, Providers } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import firebase from 'firebase/compat/app';
import { SignInWithSocialMedia } from './login-socialmedia';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/login.scss'
import ErrorMessage from '../../CommonComponents/ErrorMessage';

function LoginPage() {
    
    const [verify, setVerification] = useState<boolean>(false);
    const [login_email, setEmail] = useState<string>("");
    const [login_password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const directToRegisterPage = () => {
        navigate('/register');
    };

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setVerification(true);

        auth.signInWithEmailAndPassword(login_email, login_password)
        .then(result => {
            logging.info(result);
            navigate('/main');
        })
        .catch(error => {
            logging.error(error);
            setVerification(false);
            setError(error.message);
        });
    }

    const signInWithSocialMedia = (provider: firebase.auth.AuthProvider) => {
        if (error !== '') setError('');

        setVerification(true);

        SignInWithSocialMedia(provider)
        .then(result => {
            logging.info(result);
            navigate('/main');
        })
        .catch(error => {
            logging.error(error);
            setVerification(false);
            setError(error.message);
        });
    }

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
            <Link style={{color: "black", paddingBottom: "20px", textAlign: "right"}} to='/forgot'>Forgot password?</Link>

            
            <Button
                disabled={verify}
                color="success"
                block
                onClick={() => signInWithEmailAndPassword()}
            >Sign In</Button>

            <Button
                block
                disabled={verify}
                onClick={() => signInWithSocialMedia(Providers.google)}
                style={{ backgroundColor:'#ea4335', borderColor: '#ea4335'}} 
            ><i className="fab fa-google mr-2"></i> Sign in with Google</Button>

            <span className="formatted-text">or</span>
            <BasicButtonComponent title={"Register"} onClick={directToRegisterPage}></BasicButtonComponent>

            <ErrorMessage error={error} />
            <div className="bg-image"></div>
        </div>
    );
}

export default LoginPage;