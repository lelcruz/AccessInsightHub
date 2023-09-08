import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContainer from '../../components/AuthContainer'; // delete file later
import ErrorText from '../../components/ErrorText';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import IPageProps from '../../interfaces/page';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/registration.scss';

const RegisterPage: React.FunctionComponent<IPageProps> = props => {
    
    const [role, setRole] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDOB] = useState<string>("");
    const [signup_email, setEmail] = useState<string>("");
    const [signup_password, setPassword] = useState<string>("");
    const [confirmpassword, setConfirmPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const directToLoginPage = () => {
        navigate('/login');
      };

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
            alert("All fields are required!");
            return false;
        }

        // MATCHING REGEX
        if(!emailRegex.test(signup_email)) {
            alert("Invalid email!");
            return false;
        }

        if(!passwordRegex.test(signup_password)) {
            alert("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            return false;
        }

        // Match Password
        if(!signup_password.match(confirmpassword)) {
            alert("Passwords do not match!");
            return false;
        }

        if(!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
            alert("Name should only contain alphabets!");
            return false;
        }

        return true;
    }

    const signUpWithEmailAndPassword = () => {
        if (!Validation())
        {
            return;
        }

        if (error !== '') setError('');

        auth.createUserWithEmailAndPassword(signup_email, signup_password)
        .then(result => {
            logging.info(result);
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
                setError('Email already in use.');
            }
            else
            {
                setError('Unable to register.  Please try again later.')
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
                <input type="radio" id="researcher" value="researcher" name="role"/>
                <label htmlFor="researcher">Researcher</label>
                <span className="btn-right-space"></span>
                <input type="radio" id="participant" value="participant" name="role"/>
                <label htmlFor="participant">Participant</label>
            </div>

            <label htmlFor="firstname" className="form-check-label">First Name</label>
            <input type="text" placeholder="Salmon" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="lastname" className="form-check-label">Last Name</label>
            <input type="text" placeholder="Tuna" value={lastName} onChange={(e) => setLastName(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="dob" className="form-check-label">Date of Birth</label>
            <input type="date" value={dob} min="1900-01-01" max="2023-01-01" onChange={(e) => setDOB(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="username" className="form-check-label"> Email Address </label>
            <input type="text" placeholder="teamnamenotfound@gmail.com" value={signup_email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="password" className="form-check-label">Password</label>
            <input type="password" placeholder="**********" value={signup_password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>
            
            <label htmlFor="confirmpassword" className="form-check-label">Confirmed Password</label>
            <input type="password" placeholder="**********" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-3"/>

            <div style={{marginTop: "20px"}} className="text-end">
            <BasicButtonComponent title={"Register"} onClick={() => signUpWithEmailAndPassword()}></BasicButtonComponent>
            <span className="btn-right-space"></span>
            <BasicButtonComponent title={"Cancel"} onClick={directToLoginPage}></BasicButtonComponent>
            
            </div>
            <ErrorText error={error}/>
            </div>  
    </div>
    );
}

export default RegisterPage;