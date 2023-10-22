import React from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import StudyFormTemplate from "./StudyFormTemplate";

function TemplatePage() {
  return (
    <div className="ResearchPageBody">
      <NavbarComponent />
      <StudyFormTemplate />
    </div>
  );
}

export default TemplatePage;
