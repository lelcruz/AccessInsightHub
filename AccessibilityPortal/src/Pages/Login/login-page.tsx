import firebase from "firebase/compat/app";
import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import ErrorMessage from "../../CommonComponents/ErrorMessage";
import "../../Styles/login.scss";
import { auth, db, Providers } from "../../configurations/firebase";
import logging from "../../configurations/logging";
import { SignInWithSocialMedia } from "./login-socialmedia";
import { getDocs, query, where } from "firebase/firestore";

function LoginPage() {
    
    const [verify, setVerification] = useState<boolean>(false);
    const [login_email, setEmail] = useState<string>("");
    const [login_password, setPassword] = useState<string>("");
    const [dob, setDob] = useState<string>("null");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const directToRegisterPage = () => {
        navigate('/register');
    };

    // If the user is still saved, lead to main page
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                if(user.emailVerified) {
                    logging.info('User detected. Email: ' + user.email);
                    navigate('/main')
            }}
    })}, []);

    const signInWithEmailAndPassword = () => {
        if (error !== '') setError('');

        setVerification(true);

        // Source: Firebase - Indicates that the state will only persist in the current session or tab, 
        // and will be cleared when the tab or window in which the user authenticated is closed. 
        auth.setPersistence('session') 

        auth.signInWithEmailAndPassword(login_email, login_password)
        .then(async userCredential => {

            logging.info(userCredential);
            navigate('/main');
            
            // Verify if the verification email is clicked
            const user = userCredential.user;
            if (user) {
                if(user.emailVerified) {
                    logging.info('Email verified');
                } else {
                    logging.error('Email has not been verified! User deleted');
                    navigate('/login');
                    // Deleting user
                    user.delete() 
                        .then(function() {
                            logging.info('User deleted');
                        })
                        .catch(function(error) {
                            logging.error('Error deleting user:', error);
                        });
                }
            } 
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

        // Source: Firebase - Indicates that the state will only persist in the current session or tab, 
        // and will be cleared when the tab or window in which the user authenticated is closed. 
        auth.setPersistence('session') 

        SignInWithSocialMedia(provider)
        .then(async result => {
            logging.info(result);

            // Save user's information
            const user = result.user
            if (user) {

                // Check if the email already exists in Firestore
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    // Store data to Firestore
                    const docRef = addDoc(collection(db, "users"), {
                        firstName: user.email,
                        lastName: "null", // Default
                        dob: dob, // Default
                        email: user.email,
                        role: "participant", // Default
                        signInWithGoogle: true
                    });

                     // Create password with Google sign-in accounts
                    navigate('/main');
                }
                else {
                    navigate('/main')
                }
            }
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
            <input type="text" placeholder="Enter your email" value={login_email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>
            <label htmlFor="password" className="form-check-label">Password</label>
            <input type="password" placeholder="Enter your password" value={login_password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>

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
            <BasicButtonComponent color='light' title={"Register"} onClick={directToRegisterPage}></BasicButtonComponent>

            <ErrorMessage error={error} />
            <div className="bg-image"></div>
        </div>
    );

}
export default LoginPage;
