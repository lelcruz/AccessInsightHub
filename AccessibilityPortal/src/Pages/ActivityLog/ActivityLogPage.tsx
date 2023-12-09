import React from "react";
import {useNavigate} from "react-router-dom";
import "../../Styles/ActivityLog.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import "../Template/TemplatePage.scss"
import HistoryIcon from "../../assets/history-svgrepo-com.svg";
import StudiesCollectionIcon from "../../assets/education-books-book-study-learning-library-svgrepo-com.svg";
import SurveysRecordIcon from "../../assets/survey-record-research-catalog-svgrepo-com.svg";

function ActivityLog() {
    // Navigation hook from react-router-dom
    const navigate = useNavigate();

    // Function to navigate to the My Surveys page
    const directToMySurveys = () => navigate('/mysurveys');

    // Function to navigate to the My Studies page
    const directToMyStudies = () => navigate('/mystudies');

    // Function to navigate to the My History page
    const directToHistory = () => navigate('/myhistory');

    // Render the Activity Log page with navigation options to surveys, studies, and history
    return (
        <div className="ActivityLogBody">
            {/* Navigation bar component */}
            <NavbarComponent/>

            {/* Display box for cards */}
            <div className="display-box-template">
                {/* Card for navigating to My Surveys */}
                <div>
                    <BasicCardComponent
                        imageUrl={SurveysRecordIcon}
                        title={"My Surveys"}
                        handleClick={directToMySurveys}
                    />
                </div>
                {/* Card for navigating to My Studies */}
                <div>
                    <BasicCardComponent
                        imageUrl={StudiesCollectionIcon}
                        title={"My Studies"}
                        handleClick={directToMyStudies}
                    />
                </div>
                {/* Card for navigating to My History */}
                <div className="self-center">
                    <BasicCardComponent
                        imageUrl={HistoryIcon}
                        title={"My History"}
                        handleClick={directToHistory}
                    />
                </div>
            </div>
        </div>
    );
}

export default ActivityLog;

