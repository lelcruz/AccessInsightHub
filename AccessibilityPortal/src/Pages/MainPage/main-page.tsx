import React from 'react';
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";

import {useNavigate} from "react-router-dom";
import '../../Styles/main.scss';
import '../../Styles/custom.scss';
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";

function MainPage(){

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


        </div>


        </div>
       

        

    );

}

export default MainPage;