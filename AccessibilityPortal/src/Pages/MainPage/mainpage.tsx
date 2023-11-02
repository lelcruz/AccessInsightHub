import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import AccessibilityMenu from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import BubbleProfile from "../../CommonComponents/BubbleProfile/BubbleProfile";
import '../../Styles/main.scss';
import studiesIcon from "../../assets/book-education-study-svgrepo-com.svg";
import templateIcon from "../../assets/dashboard-layout-svgrepo-com.svg";
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import surveyIcon from "../../assets/rate-rating-survey-3-svgrepo-com.svg";
import usersIcon from "../../assets/users-svgrepo-com.svg"
import messageIcon from "../../assets/mail-alt-svgrepo-com.svg"
import { auth, db } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";

function MainPage(){

    const navigate = useNavigate();

    const logout = () => {
        auth.signOut()
        .then(result => {
            logging.info(result);
            navigate('/login');
        })
        .catch(error => logging.error(error));
    }

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

    const directToUserManagement = () => {
        navigate('/usermanage');
    }

    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isResearcher, setIsResearcher] = useState<boolean>(false);
    const [isParticipant, setIsParticipant] = useState<boolean>(false);
    
    useEffect(() => {
        auth.onAuthStateChanged( async user => {
            if (user) {
                if(user.emailVerified) {
                    //logging.info('User detected. Email: ' + user.email);

                    // Verify correct role of user
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
            <NavbarComponent/>
        {/* ADMIN MAIN PAGE */}
        { isAdmin ? 
        <>
            <div className="display-box admin">
                <div>
                    <BasicCardComponent 
                        imageUrl={usersIcon}
                        title={"Users"}
                        handleClick={directToUserManagement}
                    ></BasicCardComponent>
                </div>
                <div>
                    <BasicCardComponent
                        imageUrl={messageIcon}
                        title={"Mail"}
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
            </div>
        </>
        /* RESEARCHER MAIN PAGE */
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
            </div>
        </>
        /* PARTICIPANT MAIN PAGE */
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
                        title={"Something else"}
                        handleClick={directToTemplatePage}
                    ></BasicCardComponent>
                </div>
            </div>
        </>
        : // ERROR IF OCCURS, BACK TO LOGIN PAGE (Delay a bit) 
        <>
            
            
        </>
    }
        <AccessibilityMenu />
        </div>
    );
}

export default MainPage;
