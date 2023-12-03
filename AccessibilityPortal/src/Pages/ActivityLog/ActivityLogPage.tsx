import React from "react";
import { useNavigate } from "react-router-dom";
import "../../Styles/ActivityLog.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import "../Template/TemplatePage.scss"
import HistoryIcon from "../../assets/history-svgrepo-com.svg";
import StudiesCollectionIcon from "../../assets/education-books-book-study-learning-library-svgrepo-com.svg";
import SurveysRecordIcon from "../../assets/survey-record-research-catalog-svgrepo-com.svg";

function ActivityLog() {

  // Fetch and synchronize whenever create survey/study, then fetch to print out acitivites

  const navigate = useNavigate();

  const directToMySurveys = () => {
      navigate('/mysurveys');
  }

  const directToMyStudies = () => {
      navigate('/mystudies');
  }

  const directToHistory = () => {
      navigate('/myhistory');
  }

  return (
    <div className="ActivityLogBody">
      <NavbarComponent />

      <div className="display-box-template">
                <div>
                    <BasicCardComponent 
                        imageUrl={SurveysRecordIcon}
                        title={"My Surveys"}
                        handleClick={directToMySurveys}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={StudiesCollectionIcon}
                        title={"My Studies"}
                        handleClick={directToMyStudies}
                    ></BasicCardComponent>
                </div>
                <div className="self-center">
                    <BasicCardComponent
                        imageUrl={HistoryIcon}
                        title={"My History"}
                        handleClick={directToHistory}
                    ></BasicCardComponent>
                </div>
            </div> 
      
    </div>
  );
}

export default ActivityLog;
