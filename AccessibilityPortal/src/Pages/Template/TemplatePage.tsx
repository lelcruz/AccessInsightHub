import React from 'react';
import './SurveyTemplate.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";


function TemplatePage(){
    
    return (
      <div className="page-body">
        <NavbarComponent />
        <nav className="top-menu-wrapper">
            <a> Designer</a>
            <a> Preview</a>
            <a> Designer</a>
            <a> Designer</a>
            <a> Designer</a>
        </nav>

        <div className="editor">
            <div className="side-menu">
                Menu for drag and drop question creator.
            </div>

            <div className="main-workspace">
                <div className="title">
                    <input type="text" placeholder="Survey Title" />
                </div>
            </div>
        </div>
        
      </div>
    );

}

export default TemplatePage;