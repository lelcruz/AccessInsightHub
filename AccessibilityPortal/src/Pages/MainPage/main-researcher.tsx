import React from 'react';
import { useNavigate } from "react-router-dom";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import '../../Styles/custom.scss';
import '../../Styles/main.scss';
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";

function MainPageResearcher(){

    const navigate = useNavigate();

    const directToChangePassword = () => {
        navigate('/change');
    };

    const directToLogoutPage = () => {
        navigate('/logout');
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
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={studiesIcon}
                        title={"Studies"}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={profileIcon}
                        title={"Profile"}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={templateIcon}
                        title={"Templates"}
                    ></BasicCardComponent>
                </div>

                <div>
                    <BasicButtonComponent title={"Change My Password"} onClick={directToChangePassword}></BasicButtonComponent>
                </div>

                <div>
                    <BasicButtonComponent title={"Log Out"} onClick={directToLogoutPage}></BasicButtonComponent>
                </div>
                
            </div>
        </div>
    );

}

export default MainPageResearcher;