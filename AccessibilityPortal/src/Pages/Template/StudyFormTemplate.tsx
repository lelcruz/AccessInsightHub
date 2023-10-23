import React, { FormEvent } from "react";
import useInput from "./UseInput";
import "./StudyFormStyling.scss";

const BasicForm = (props: any) => {
  const {
    value: enteredFirstName,
    isValid: enteredFirstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangedHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredLastName,
    isValid: enteredLastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangedHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastNameInput,
  } = useInput((value: string) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value: string) => value.includes("@"));

  let formIsValid = false;

  if (enteredFirstNameIsValid && enteredLastNameIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!enteredFirstNameIsValid || !enteredLastNameIsValid) {
      return;
    }

    resetFirstNameInput();
    resetLastNameInput();
  };

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className="central-content">
        <h1 className="text-center">Post New Study</h1>
        <div>
          {/*<label htmlFor="name">First Name</label>*/}
          <input
            type="text"
            className="form-control"
            id="floatingTitle"
            placeholder="Title"
            onChange={firstNameChangedHandler}
            value={enteredFirstName}
            onBlur={firstNameBlurHandler}
          />
          {firstNameInputHasError && (
            <p className="error-text">Title must not be empty.</p>
          )}
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Author Name"
            onChange={lastNameChangedHandler}
            value={enteredLastName}
            onBlur={lastNameBlurHandler}
          />
          {lastNameInputHasError && (
            <p className="error-text">Author name must not be empty.</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="date">Start Date:</label>
          <input type="date" id="date" name="date" />
        </div>

        <div className="form-group">
          <label htmlFor="studyType">Study Type:</label>
          <select id="studyType" name="studyType" className="form-control">
            <option value="">Select a study type</option>
            <option value="Experimental">Experimental</option>
            <option value="Observational">Observational</option>
          </select>
        </div>
      </div>

      {/*<div className="form-actions">*/}
      {/*  <button type="submit">Submit</button>*/}
      {/*</div>*/}
    </form>
  );
};

export default BasicForm;
