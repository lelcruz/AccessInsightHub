import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import BasicCardComponent from "../../CommonComponents/Card/BasicCardComponent";
import StudyTemplateIcon from "../../assets/format-svgrepo-com.svg";
import SurveyTemplateIcon from "../../assets/edit-form-svgrepo-com.svg";
import ActivityLogIcon from "../../assets/activity-log-svgrepo-com.svg";
import "./TemplatePage.scss";
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../configurations/firebase';

function TemplatePage(){

    const navigate = useNavigate();

    const directToSurveyTemplate = () => {
        //createSurveyBackend();
        navigate('/survey-simple'); // might change later
    }

    const directToStudiesTemplate = () => {
        navigate('/study-template');
    }

    const directToActivityLog = () => {
        navigate('/activity-log');
    }

    const createSurveyBackend = async () => {
        const user = auth.currentUser;
        try {
            if (user) {       
                
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email)); 
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    const surveyRef = await addDoc(collection(db, "edittingsurveys"), {
                        author: user.email,
                        user_uid: user.uid,
                        title: "",
                        description: "",
                    });
    
                    // Survey UID in firebase
                    const surveyUID = surveyRef.id;
    
                    // Add a question collection to the survey editor
                    const subcollectionRef = collection(doc(db, "edittingsurveys", surveyUID), "questions");
                    
                    // Initialize a demo question
                    await addDoc(subcollectionRef, {
                        id: 0,
                        title: "demo question",
                        answers: [],
                    });
    
                    console.log("A new survey template is created");
                }
            } else {
                console.error("No user detected");
            } 
        } catch (error) {
            console.error("Error creating subcollection: ", error);
        }
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
                <div className="self-center">
                    <BasicCardComponent
                        imageUrl={ActivityLogIcon}
                        title={"Activity Log"}
                        handleClick={directToActivityLog}
                    ></BasicCardComponent>
                </div>
            </div> 
        </div>
    );
}
export default TemplatePage;