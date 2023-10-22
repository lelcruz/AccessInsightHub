import React, { useState } from 'react';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { Providers, auth, db } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/registration.scss';
import {useNavigate} from "react-router-dom";
import { Button } from 'reactstrap';
import { collection, addDoc} from "firebase/firestore";

// Working on - Not executable

function CreatePasswordWithGoogleAccount() {
    
    const navigate = useNavigate();

    const directToLoginPage = () => {
        navigate('/login');
    };

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirm_password, setConfirmPassword] = useState<string>("");
    const [dob, setDob] = useState<string>("null");
    const [error, setError] = useState<string>("");

    // Text-fields are required
    function isItEmpty(str: any) {
        return str == null || str.match(/^ *$/) !== null;
    }

    // Validation
    function Validation() {
        //let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordRegex = /.*/; // simple one

        // All fields are required
        if(isItEmpty(password) || isItEmpty(confirm_password)){
            setError("All fields are required!");
            return false;
        }

        // Match password-regex
        if(!passwordRegex.test(password)) {
            setError("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            return false;
        }

        // Confirm Password
        if(!password.match(confirm_password)) {
            setError("Passwords do not match!");
            return false;
        }
        return true;
    }

    const createWithGoogle = () => {
      if (!Validation()) 
        return;

      if (error !== '') setError('');

      auth.onAuthStateChanged(user => {
        if (user) {
          
          if (user.emailVerified) {
            logging.info('User detected (in Google Page). Email: ' + user.email);

            // Make sure user.email is not null before setting it as the email
            if (user.email !== null) {
              auth.createUserWithEmailAndPassword(user.email, password)
                .then(userCredential => {
                    const user = userCredential.user;
                    if (user) {
                        logging.info(user);
                        // Store data to Firestore
                        const docRef = addDoc(collection(db, "users"), {
                          firstName: user.email,
                          lastName: "null", // Default
                          dob: dob, // Default
                          email: user.email,
                          role: "participant", // Default
                      });
                    } else {
                        logging.error('User is null');
                    }
                })

                .catch(error => {
                    logging.error(error);

                    if (error.code.includes('auth/weak-password')) {
                        setError('Please enter a stronger password.');
                    }
                    else if (error.code.includes('auth/email-already-in-use')) {
                        setError('Email already in use, please try another email!');
                    }
                    else {
                        setError('Unable to register. Please try again later.')
                    }
                  });
            }
          }
          else {
            console.log("No email!!")
          }
    }})

      // Direct to main
      navigate('/main')
  }

    return (
        <div id="createwithgoogle" className="createwithgoogle-page">
                <div className="text-center">
                    <h2>Create your password</h2>
                </div>

            <div className="createwithgoogle-body">
              
                <label htmlFor="password" className="form-check-label">New Password</label>
                <input type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>
                
                <label htmlFor="password" className="form-check-label">Confirm New Password</label>
                <input type="password" placeholder="**********" value={confirm_password} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-3"/>
                
                <div style={{marginTop: "20px"}} className="text-end">
                    <Button 
                        color="success"
                        block
                        onClick={() => createWithGoogle()}
                    >Create account</Button>
                    
                    <span className="btn-right-space"></span>
                    <BasicButtonComponent color='light' title={"Cancel"} onClick={directToLoginPage}></BasicButtonComponent>
                </div>

                <ErrorMessage error={error}/>
            </div>  
        </div>
    );
}

export default CreatePasswordWithGoogleAccount;