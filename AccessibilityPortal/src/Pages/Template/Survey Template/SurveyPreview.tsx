import React, {useState, useContext} from 'react';
import {NavLink} from "react-router-dom";
import './SurveyTemplate.scss';
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import SurveyCard from "./SurveyCard";
import {useTitleDescription} from  "./Context";

function SurveyPreview(){
    
    const [questions, setQuestion] = useState([1]);
    const { title, description } = useTitleDescription();
    

    return (
      <div className="page-body">
        <NavbarComponent />
        <nav className="top-menu-wrapper">
            <NavLink to="/survey-editor" className={({isActive}) => (isActive ? "link active" : "link")}> Editor </NavLink>
            <NavLink to="/survey-preview" className={({isActive}) => (isActive ? "link active" : "link")}> Preview </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Theme </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Settings </NavLink>
        </nav>

        <div className="editor">
            <div className="main-workspace preview">
                <div className="title">
                    <div className="survey-title" aria-label="Survey-Title">{title}</div>
                    <div className="description" aria-label="Description">{description}</div>
                    <hr></hr>
                </div>

                {/* Sortable question cards */} 
                <div className="card-wrapper">
                    {questions.map(question => <SurveyCard />)}
                </div>
            
            </div>
        </div>
        
      </div>
    );

}

export default SurveyPreview;