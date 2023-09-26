import React from "react";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import AccessibilityMenu from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import { useNavigate } from "react-router-dom";
import "../../Styles/main.scss";
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";

function MainPage() {
  const navigate = useNavigate();

  const directToStudiesPage = () => {
    navigate("/studies");
  };

  const directToSurveyPage = () => {
    navigate("/survey");
  };

  const directToProfilePage = () => {
    navigate("/profile");
  };

  const directToTemplatePage = () => {
    navigate("/template");
  };

  return (
    <div className="main-page">
      <div className="header">
        <div className="input-group">
          <input type="search" className="form-control"></input>
          <button className="btn btn-dark">Search</button>
        </div>
      </div>

      <div className="display-box">
        <div>
          <BasicCardComponent
            imageUrl={surveyIcon}
            title={"Surveys"}
            handleClick={directToSurveyPage}
          ></BasicCardComponent>
        </div>
        <div>
          <BasicCardComponent
            imageUrl={studiesIcon}
            title={"Studies"}
            handleClick={directToStudiesPage}
          ></BasicCardComponent>
        </div>
        <div>
          <BasicCardComponent
            imageUrl={profileIcon}
            title={"Profile"}
            handleClick={directToProfilePage}
          ></BasicCardComponent>
        </div>
        <div>
          <BasicCardComponent
            imageUrl={templateIcon}
            title={"Templates"}
            handleClick={directToTemplatePage}
          ></BasicCardComponent>
        </div>
      </div>

      <AccessibilityMenu />
    </div>
  );
}

export default MainPage;
