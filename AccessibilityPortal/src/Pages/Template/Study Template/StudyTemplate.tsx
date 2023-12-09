import React from "react";
import "../../../Styles/ResearchPage.scss";
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import StudyFormTemplate from "./StudyFormTemplate";

// Define a React component called SurveyPage

function SurveyPage() {
    //rendering components
    return (
        <div className="ResearchPageBody">
            <NavbarComponent/>
            <StudyFormTemplate/>
        </div>
    );
}

export default SurveyPage;
