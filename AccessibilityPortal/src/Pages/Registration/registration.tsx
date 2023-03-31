import React from 'react';

function Registration() {
  return (
    <div className="registration-page">
      <div style={{ textAlign: "center", backgroundColor: "#ACB0BD" }}>
        <h3>Welcome</h3>
        <h5>Register to create your account</h5>
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

        <h4 style={{ margin: ".5rem 0 .5rem 0" }}>
          Select type of your accout
        </h4>

        <div className="button-layout">
          <button>Researcher</button>
          <button>Participant</button>
        </div>

        <label>Password</label>
        <input></input>
        <label>Confirm Password</label>
        <input></input>
        <div className="button-layout2">
          <button>Cancel</button>
          <button>Registration</button>
        </div>
      </div>
    </div>
  );
}
export default Registration;
