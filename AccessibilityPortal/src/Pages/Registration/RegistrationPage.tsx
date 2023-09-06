import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { getDatabase, ref, set } from "firebase/database";

import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import {useNavigate} from "react-router-dom";
import '../../Styles/registration.scss';

function RegistrationPage() {
  const navigate = useNavigate();

  const directToLoginPage = () => {
    navigate('/login');
  };

  const directToMainPage = () => {
    navigate('/main');
  };

  function CreateUserAccount() {
    if(!Validation()) {
        return;
    }
    else {
      navigate('/login');
    }
  }

  // -----------------------------------------Validating all inputs-----------------------------------------
  //const [role, setRole] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [dob, setDOB] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [checkbox, setCheckbox] = useState("false");

  function isItEmpty(str: any) {
    return str == null || str.match(/^ *$/) !== null;
  }
  // Validation
  function Validation() {
    let nameRegex = /^[a-zA-Z\s]+$/; // first name & last name
    let emailRegex = /^[a-zA-Z0-9]+@([a-zA-Z]+\.[a-zA-Z]+)+$/; 
    //let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let passwordRegex = /.*/; // simple one
    let agreedTerms = checkbox;

    // All fields are required
    if(isItEmpty(firstName) || isItEmpty(lastName) || isItEmpty(dob) 
        || isItEmpty(email) || isItEmpty(password) || isItEmpty(confirmpassword)){
        alert("All fields are required!");
        return false;
    }

    // MATCHING REGEX
    if(!emailRegex.test(email)) {
        alert("Invalid email!");
        return false;
    }

    if(!passwordRegex.test(password)) {
        alert("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
        return false;
    }

    // Match Password
    if(!password.match(confirmpassword)) {
        alert("Passwords do not match!");
        return false;
    }

    if(!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        alert("Name should only contain alphabets!");
        return false;
    }

    if(!agreedTerms) {
        alert("Please agree to the terms and conditions!");
        return false; }

    return true;
}
  
  //  ----------------------------------------------------------------------------------
  return (
    <div className="registration-page">
      <div className="text-center">
        <h2>Welcome</h2>
        <h5>Register to create your account</h5>
      </div>

      <div className="registration-body">
        <h5 className="text-center">
          Select type of your account
        </h5>

        <div className="radio-button">
          {/*<BasicButtonComponent title={"Researcher"}></BasicButtonComponent>
          <span className="btn-right-space"></span>
          <BasicButtonComponent title={"Participant"}></BasicButtonComponent>
  */}
          {/*<input type="radio" id="researcher" value={role} onChange={(e) => setRole("researcher")}/>
          <label htmlFor="researcher">Researcher</label>
          <span className="btn-right-space"></span>
          <input type="radio" id="participant" value={role} onChange={(e) => setRole("participant")}/>
          <label htmlFor="participant">Participant</label>*/}
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
        <input type="text" placeholder="teamnamenotfound@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>
        <label htmlFor="password" className="form-check-label">Password</label>
        <input type="password" placeholder="**********" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control mb-3"/>
        <label htmlFor="confirmpassword" className="form-check-label">Confirmed Password</label>
        <input type="password" placeholder="**********" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-3"/>
      
        <div className="form-check">
            <input className="form-check-input" type="checkbox" value={checkbox} onChange={(e) => setCheckbox("true")}/>
            <label className="form-check-label" htmlFor="flexCheckDefault">
                I agree to the terms and conditions 
            </label>
        </div>

        <div style={{marginTop: "20px"}} className="text-end">
        <BasicButtonComponent title={"Cancel"} onClick={directToLoginPage}></BasicButtonComponent>
        <span className="btn-right-space"></span>
        <BasicButtonComponent title={"Register"} onClick={CreateUserAccount}></BasicButtonComponent>
        </div>
      </div>   
    </div>
  );
  
}
export default RegistrationPage;
