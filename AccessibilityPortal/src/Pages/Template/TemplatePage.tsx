import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import StudyTemplateIcon from "../../assets/format-svgrepo-com.svg";
import SurveyTemplateIcon from "../../assets/edit-form-svgrepo-com.svg";
import ActivityLogIcon from "../../assets/activity-log-svgrepo-com.svg";
import "./TemplatePage.scss";

function TemplatePage(){

    const navigate = useNavigate();

    const directToSurveyTemplate = () => {
        navigate('/survey-editor');
    }

    const directToStudiesTemplate = () => {
        navigate('/study-template');
    }

    return(
        <div className="main-page">
            <NavbarComponent />
            <div className="display-box-template">
                <div>
                    <BasicCardComponent 
                        imageUrl={SurveyTemplateIcon}
                        title={"Survey Creator"}
                        handleClick={directToSurveyTemplate}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={StudyTemplateIcon}
                        title={"Study Creator"}
                        handleClick={directToStudiesTemplate}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={ActivityLogIcon}
                        title={"Activity Log"}
                        handleClick={directToStudiesTemplate}
                    ></BasicCardComponent>
                </div>
            </div> 
        </div>
    );
}
export default TemplatePage;