import React, { useState } from 'react';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/registration.scss';
import {useNavigate} from "react-router-dom";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../../configurations/firebase";
import { hashPassword } from "../../Backend/hashPassword";

function RegisterPage() {

    const navigate = useNavigate();

    const directToLoginPage = () => {
        navigate('/login');
    };

    const [role, setRole] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDOB] = useState<string>("");
    const [signup_email, setEmail] = useState<string>("");
    const [signup_password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    // Text-fields are required
    function isItEmpty(str: any) {
        return str == null || str.match(/^ *$/) !== null;
    }

    // Validation
    function Validation() {
        let nameRegex = /^[a-zA-Z\s]+$/; // first name & last name
        let emailRegex = /^[a-zA-Z0-9]+@([a-zA-Z]+\.[a-zA-Z]+)+$/; 
        //let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordRegex = /.*/; // simple one

        // All fields are required
        if(isItEmpty(firstName) || isItEmpty(lastName) || isItEmpty(dob) 
            || isItEmpty(signup_email) || isItEmpty(signup_password) || isItEmpty(confirmpassword)){
                setError("All fields are required!");
            return false;
        }

        // MATCHING REGEX
        if(!emailRegex.test(signup_email)) {
            setError("Invalid email!");
            return false;
        }

        if(!passwordRegex.test(signup_password)) {
            setError("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            return false;
        }

        // Match Password
        if(!signup_password.match(confirmpassword)) {
            setError("Passwords do not match!");
            return false;
        }

        if(!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            setError("Name should only contain alphabets!");
            return false;
        }

        return true;
    }

    // Verification Email 
    const actionCodeSettings = {
        url: 'http://localhost:5173/login', // The URL where the user will be redirected after clicking the email verification link.
        handleCodeInApp: true, // This indicates whether to open the link in a mobile app if it's installed.
    };

    const signUpWithEmailAndPassword = () => {
        if (!Validation())
        {
            return;
        }

        if (error !== '') setError('');

        auth.createUserWithEmailAndPassword(signup_email, signup_password)
            .then(userCredential => {
                const user = userCredential.user;

                if (user) {
                    logging.info(user);

                    user.sendEmailVerification(actionCodeSettings)
                        .then(function() {
                            logging.info('One-time verification email sent');
                        })
                        .catch(function(error) {
                            logging.error('Error occurs sending verification email');
                            user.delete() 
                                .then(function() {
                                    logging.info('User deleted');
                                })
                                .catch(function(error) {
                                    logging.error('Error deleting user:', error);
                                });
                        });
                } else {
                    logging.error('User is null');
                }

                // Store data to Firestore
                const docRef = addDoc(collection(db, "users"), {
                    firstName: firstName,
                    lastName: lastName,
                    dob: dob,
                    email: signup_email,
                    role: role,
                });

                // Back to login
                navigate('/login');
            })
            .catch(error => {
                logging.error(error);

                if (error.code.includes('auth/weak-password'))
                {
                    setError('Please enter a stronger password.');
                }
                else if (error.code.includes('auth/email-already-in-use'))
                {
                    setError('Email already in use, please try another email!');
                }
                else
                {
                    setError('Unable to register. Please try again later.')
                }
        });
    }

    return (
        <div id="registration" className="registration-page">
            <div className="text-center">
                <h2>Welcome</h2>
                <h5>Register to create your account</h5>
            </div>

            <div className="registration-body">
                <h5 className="text-center">
                    Select type of your account
                </h5>

            <div className="radio-button">
                <input type="radio" id="researcher" value={role} onChange={(e) => setRole("researcher")} name="role"/>
                <label htmlFor="researcher">Researcher</label>
                <span className="btn-right-space"></span>
                <input type="radio" id="participant" value={role} onChange={(e) => setRole("participant")} name="role"/>
                <label htmlFor="participant">Participant</label>
            </div>

            <label htmlFor="firstname" className="form-check-label">First Name</label>
            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="lastname" className="form-check-label">Last Name</label>
            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="dob" className="form-check-label">Date of Birth</label>
            <input type="date" value={dob} min="1900-01-01" max="2023-01-01" onChange={(e) => setDOB(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="username" className="form-check-label"> Email Address </label>
            <input type="text" placeholder="Enter your email" value={signup_email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="password" className="form-check-label">Password</label>
            <input type="password" placeholder="Enter your password" value={signup_password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="confirmpassword" className="form-check-label">Confirmed Password</label>
            <input type="password" placeholder="Confirm your password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-3"/>

            <div style={{marginTop: "20px"}} className="text-end">
            <BasicButtonComponent color='light' title={"Register"} onClick={() => signUpWithEmailAndPassword()}></BasicButtonComponent>
            <span className="btn-right-space"></span>
            <BasicButtonComponent color='light' title={"Cancel"} onClick={directToLoginPage}></BasicButtonComponent>
            </div>
            
            <ErrorMessage error={error}/>
        </div>  
    </div>
    );
}

export default RegisterPage;