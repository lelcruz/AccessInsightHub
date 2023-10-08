import React from 'react';
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import '../../Styles/main.scss';
import '../../Styles/custom.scss';
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import {useNavigate} from "react-router-dom";

function MainPageParticipant(){

    const navigate = useNavigate();

    const directToChangePassword = () => {
        navigate('/change');
    };

    const directToLogoutPage = () => {
        navigate('/logout');
    };

    const directToStudyPage = () => {
        navigate('/studies');
    }

    const directToSurveyPage = () => {
        navigate('/survey');
    }

    const directToProfilePage = () => {
        navigate('/profile');
    }

    const directToTemplatePage = () => {
        navigate('/template');
    }

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
                        handleClick={directToStudyPage}
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

                <div>
                    <BasicButtonComponent color='light' title={"Change My Password"} onClick={directToChangePassword}></BasicButtonComponent>
                </div>

                <div>
                    <BasicButtonComponent color='light' title={"Log Out"} onClick={directToLogoutPage}></BasicButtonComponent>
                </div>
                
            </div>
        </div>
    );

}

export default MainPageParticipant;