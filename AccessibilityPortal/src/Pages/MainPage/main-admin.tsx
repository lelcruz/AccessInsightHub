import React from 'react';
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import '../../Styles/main.scss';
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import {useNavigate} from "react-router-dom";

function MainPageAdmin(){

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
                        imageUrl={profileIcon}
                        title={"Users"}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={templateIcon}
                        title={"Messages"}
                    ></BasicCardComponent>
                </div>
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
                    <BasicButtonComponent color={"light"} title={"Do Something"} onClick={directToChangePassword}></BasicButtonComponent>
                </div>

                <div>
                    <BasicButtonComponent color={"light"} title={"Log Out"} onClick={directToLogoutPage}></BasicButtonComponent>
                </div>
                
            </div>
        </div>
    );

}

export default MainPageAdmin;