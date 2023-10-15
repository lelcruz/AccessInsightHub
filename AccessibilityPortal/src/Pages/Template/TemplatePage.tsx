import React from 'react';
import './SurveyTemplate.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import QuestionCard from "./QuestionCard";


function TemplatePage(){
    
    return (
      <div className="page-body">
        <NavbarComponent />
        <nav className="top-menu-wrapper">
            <a> Editor</a>
            <a> Preview</a>
            <a> Theme</a>
            <a> Settings</a>
        </nav>

        <div className="editor">
            <div className="side-menu">
                Menu for drag and drop question creator.
            </div>

            <div className="main-workspace">
                <div className="title">
                    <div className="borderless-input survey-title" aria-label="Survey-Title" role="textbox" contentEditable="true" aria-multiline="true"/>
                    <div className="borderless-input description" aria-label="Description" role="textbox" contentEditable="true" aria-multiline="true"  />
                    <hr></hr>
                </div>
                <QuestionCard />
            </div>
        </div>
        
      </div>
    );

}

export default TemplatePage;