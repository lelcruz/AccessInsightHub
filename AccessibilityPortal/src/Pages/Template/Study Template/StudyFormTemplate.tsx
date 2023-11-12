import React, { FormEvent, useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import userInput from "./UserInput";
import "./StudyFormStyling.scss";
import { auth, db } from '../../../configurations/firebase';
import { collection, addDoc, query, where } from "firebase/firestore";
import logging from '../../../configurations/logging';

const StudyFormTemplate = () => {

  const [date, setDate] = useState<string>("");
  const [studyType, setStudyType] = useState<string>("");

  const navigate = useNavigate();

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleInputHasError,
    valueChangeHandler: titleChangedHandler,
    inputBlurHandler: titleBlurHandler,
    reset: resetTitleInput,
  } = userInput((value: string) => value.trim() !== "");

  const {
    value: enteredAuthorName,
    isValid: enteredAuthorNameIsValid,
    hasError: authorNameInputHasError,
    valueChangeHandler: authorNameChangedHandler,
    inputBlurHandler: authorNameBlurHandler,
    reset: resetAuthorNameInput,
  } = userInput((value: string) => value.trim() !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = userInput((value: string) => value.includes(""));

  const {
    value: enteredTag,
    isValid: enteredTagIsValid,
    hasError: tagInputHasError,
    valueChangeHandler: tagChangedHandler,
    inputBlurHandler: tagBlurHandler,
    reset: resetTagInput,
  } = userInput((value: string) => value.trim() !== "");

  let formIsValid = false;

  if (
    enteredTitleIsValid &&
    enteredAuthorNameIsValid &&
    enteredDescriptionIsValid &&
    enteredTagIsValid 
  ) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event: FormEvent) => {
    event.preventDefault();

    if (
      !enteredTitleIsValid ||
      !enteredAuthorNameIsValid ||
      !enteredDescriptionIsValid ||
      !enteredTagIsValid
    ) {
      return;
    }

    resetTitleInput();
    resetAuthorNameInput();
    resetDescriptionInput();
    resetTagInput();
  };

  const submit = () => {

    //console.log(enteredAuthorNameIsValid)
    //console.log(enteredDescriptionIsValid)
    //console.log(enteredTitleIsValid)

    if(formIsValid) {

      logging.info('StudyForm: Valid ');

      auth.onAuthStateChanged( async user => {
        if (user) {
          logging.info('StudyForm: User detected. Email: ' + user.email);

          // Store data to Firestore
          const docRef = addDoc(collection(db, "studies"), {
            uid: user.uid,
            author_email: user.email,
            title: enteredTitle,
            author_name: enteredAuthorName,
            date: date,
            type: studyType,
            tag: enteredTag,
            description: enteredDescription,
          });

          navigate('/template');

          // alert pops up succesully...

          // save for activity log
          
        }});} else {
          logging.info('StudyForm: Not Valid ');
          return
      }
  } 

  const directToTemplatePage = () => {
    navigate('/template')
  }

  return (
    <form className="container mt-4" onSubmit={formSubmissionHandler}>
      <h1 className="text-center">Post a New Study</h1>
      <div className="form-control">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Title"
            onChange={titleChangedHandler}
            value={enteredTitle}
            onBlur={titleBlurHandler}
          />
          {titleInputHasError && (
            <p className="error-text">Title must not be empty.</p>
          )}
        </div>

        <div className="form-group">
          <label>Author Name:</label>
          <input
            type="text"
            className="form-control"
            id="floatingName"
            placeholder="Author Name"
            onChange={authorNameChangedHandler}
            value={enteredAuthorName}
            onBlur={authorNameBlurHandler}
          />
          {authorNameInputHasError && (
            <p className="error-text">Author name must not be empty.</p>
          )}
        </div>

        <div className="form-group">
          <label>Start Date:</label>
          <input type="date" id="date" name="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)}/>
        </div>

        <div className="form-group">
          <label>Study Type:</label>
          <select id="studyType" name="studyType" className="form-control" onChange={(e) => setStudyType(e.target.value)}>
            <option value="">Select a study type</option>
            <option value="Experimental">Experimental</option>
            <option value="Observational">Observational</option>
          </select>
        </div>

        <div className="form-group">
          <label>Preference Tags (Please use a separate # tag for each topic)</label>
          <input
            type="text"   
            className="form-control"
            id="floatingInput"
            placeholder="Tags"
            onChange={tagChangedHandler}
            value={enteredTag}
            onBlur={tagBlurHandler}
          />
          {descriptionInputHasError && (
            <p className="error-text">Tag must not be empty.</p>
          )}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-control"
            id="floatingInput"
            placeholder="Description"
            onChange={descriptionChangeHandler}
            value={enteredDescription}
            onBlur={descriptionBlurHandler}
          />
          {descriptionInputHasError && (
            <p className="error-text">Description must not be empty.</p>
          )}
        </div>

        <div style={{ marginTop: "20px" }}>
          <button type="button" className="btn btn-outline-dark" onClick={submit}>
            Submit
          </button>
          <button type="button" className="btn btn-outline-dark" onClick={directToTemplatePage} >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default StudyFormTemplate;
