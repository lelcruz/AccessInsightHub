import React from "react";
import "../../../Styles/ResearchPage.scss";
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import SurveyFormTemplate from "./SurveyFormTemplate";

function SurveyPage() {
  return (
    <div className="ResearchPageBody">
      <NavbarComponent />
      <SurveyFormTemplate />
    </div>
  );
}

export default SurveyPage;
