import React from 'react';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import {useNavigate} from "react-router-dom";
function Registration() {
  const navigate = useNavigate();

  const directToLoginPage = () => {
    navigate('/cancel');
  };



  return (
    <div className="registration-page">
      <div style={{ textAlign: "center" }}>
        <h3>Welcome</h3>
        <h5>Register to create your account</h5>
      </div>


      <h5 style={{ textAlign: "center", margin: ".5rem 0 .5rem 0" }}>
          Select type of your account
        </h5>

        <div>
          <BasicButtonComponent title={"Researcher"}></BasicButtonComponent>
          <BasicButtonComponent title={"Participant"}></BasicButtonComponent>
        </div>


      <div className="registration-body">
        <label>First Name</label>
        <input></input>
        <label>Last Name</label>
        <input></input>
        <label>Date of Birth</label>
        <input></input>
        <label>Email Address</label>
        <input></input>

        <label>Password</label>
        <input></input>
        <label>Confirm Password</label>
        <input></input>
        <div>
        <BasicButtonComponent title={"Cancel"} ></BasicButtonComponent>
        <BasicButtonComponent title={"Register"}></BasicButtonComponent>
        </div>
      </div>
    </div>
  );
}
export default Registration;
