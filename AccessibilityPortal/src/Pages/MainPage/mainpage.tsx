import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import AccessibilityMenu from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import '../../Styles/main.scss';
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import { auth, db } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import Logout from "../LogoutPage/logout";

function MainPage(){

    const navigate = useNavigate();

    const directToLoginPage = () => {
        navigate('/login');
    };

    const directToChangePassword = () => {
        navigate('/change');
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

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isResearcher, setIsResearcher] = useState<boolean>(false);
    const [isParticipant, setIsParticipant] = useState<boolean>(false);

    useEffect(() => {
        auth.onAuthStateChanged( async user => {
            if (user) {
                if(user.emailVerified) {
                    logging.info('User detected. Email: ' + user.email);
                    // User.mail to lead to correct main page

                    const q = query(collection(db, "users"), where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);

                    querySnapshot.forEach((doc) => {
                        console.log(doc.id, ' => ', doc.data().role);
                        // Detect ROLE of user
                        let userRole = doc.data().role;
                        switch(userRole) {
                            case 'admin':
                                setIsAdmin(true)
                                break
                            case 'researcher':
                                setIsResearcher(true)
                                break
                            case 'participant':
                                setIsParticipant(true)
                                break
                            default:
                                return 'unknown';
                        }
                    });
            }}
    })}, []);


    return (
        <div className="main-page">

            <div className="header">
            <div className="input-group">
                <input type="search" className="form-control"></input>
                <button className="btn btn-dark">Search</button>
            </div>
            </div>

        { isAdmin ?
        <>
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
                    <BasicButtonComponent color='light' title={"Do Something"} onClick={directToChangePassword}></BasicButtonComponent>
                </div>

                <div>
                    <Logout></Logout>
                </div>
                
            </div>
        </>
        : isResearcher ?
        <>
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
                    <Logout></Logout>
                </div>
                
            </div>
        </>
        : isParticipant ?
        <>
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
                    <Logout></Logout>
                </div>
            </div>
        </>
        : // ERROR IF OCCURS, BACK TO LOGIN PAGE (Delay a bit)
        <>
            <h1>!!! UNEXPECTED ERROR !!!</h1>
            <BasicButtonComponent color='light' title={"BACK"} onClick={directToLoginPage}></BasicButtonComponent>
        </>
    }

        <AccessibilityMenu />
        </div>
    
    );
}

export default MainPage;