import React, {useState, useEffect, useRef} from 'react';
import {NavLink} from "react-router-dom";
import './SurveyTemplate.scss';
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import SortableCard from "./SortableCard";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import RadioButtonIcon from "../../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../../assets/folder-upload-svgrepo-com.svg";
import {useTitleDescription} from  "./Context";
import ContentEditable from "react-contenteditable";
import { addDoc, collection, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../../configurations/firebase';
import { useNavigate } from "react-router-dom";
import debounce from 'lodash.debounce';

interface SurveyProps{    
    title: string;
    description: string;
    questions: Question[];
}

interface Question {
    id: string;
    type: string;
    title: string;
    answers: string[];
}

function SurveyEditor(){

    const [type, setType] = useState<string>();
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionAnswers, setQuestionAnswer] = useState<string[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyAuthor, setSurveyAuthor] = useState("");
    const [surveyTitle, setSurveyTitle] = useState("");
    const [surveyDescription, setSurveyDescription] = useState("");
    //const { title, setTitle, description, setDescription } = useTitleDescription(); //Synchronize the information entered to preview page
    const navigate = useNavigate();

    // BACK //
    const fetchEdittingSurvey = async () => {

        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email)); 
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error("No matching documents found"); // Throw an error if the query is empty
                }
                // Process the query results if not empty
                querySnapshot.forEach(async (doc) => {

                    // Title and description
                    setSurveyAuthor(doc.data().author)
                    setSurveyTitle(doc.data().title)
                    setSurveyDescription(doc.data().description)

                    const surveyID = doc.id; // Replace with the survey's ID
                    const nestedQuestionCollectionRef = collection(db, 'edittingsurveys', surveyID, 'questions');

                     // Retrieve documents from the nested collection
                    const nestedSnapshot = await getDocs(nestedQuestionCollectionRef)
                    nestedSnapshot.forEach((doc) => {

                        const newQuestion: Question = {
                            id: doc.data().id as string,
                            type: doc.data().type as string,
                            title: doc.data().title as string,
                            answers: doc.data().answers as string[],
                        };
                
                        // Update the questions state by adding the new question
                        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);

                    });
                       
                });      
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
        return questions;
    }

    // Function to handle changes
    const handleTitleChange = async (e: React.FormEvent<HTMLDivElement>) => {
        const enteredTitle = e.currentTarget.textContent || "";
        setSurveyTitle(enteredTitle);
        
        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        // Update the title field in the Firestore document
                        updateDoc(doc.ref, {
                            title: enteredTitle,
                        })
                            .then(() => {
                                //console.log("Document updated successfully with new title.");
                            })
                            .catch((error) => {
                                console.error("Error updating document:", error);
                            });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
                navigate('/template');
            }
        }
    }

    const handleDescriptionChange = async (e: React.FormEvent<HTMLDivElement>) => {
        const enteredDescription = e.currentTarget.textContent || "";
        setSurveyDescription(enteredDescription);
        
        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        // Update the title field in the Firestore document
                        updateDoc(doc.ref, {
                            description: enteredDescription,
                        })
                            .then(() => {
                                //console.log("Document updated successfully with new title.");
                            })
                            .catch((error) => {
                                console.error("Error updating document:", error);
                            });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
                navigate('/template');
            }
        }
    }

    //Handle onDragEnd attribute of sortable cards
    function handleDragEnd(e: any) {
        console.log("Drag end called");
        const {active, over} = e;
        console.log("ACTIVE: ", + active.id);
        console.log("OVER: ", + over.id);

        if (over && active.id !== over.id) {
            setQuestions((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                return arrayMove(items, activeIndex, overIndex);
                
            });
        }
    }

    //Remove card from question list by filtering its id number
    const removeCard = async (id: string) => {
    
       // Update to Firebase
       const user = auth.currentUser;
       if (user) {
           try {
               const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
               const querySnapshot = await getDocs(q);
               if (!querySnapshot.empty) {
                   querySnapshot.forEach(async (doc) => {
                       const surveyID = doc.id; // Replace with the survey's ID
                       const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", id));

                       getDocs(nestedQ)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {
                            // Delete the document
                            deleteDoc(doc.ref)
                                .then(() => {
                                console.log('Question is successfully deleted!');
                                })
                                .catch((error) => {
                                console.error('Error removing question: ' + id, error);
                                });
                            });
                        })
                        .catch((error) => {
                            console.error('Error getting documents: ', error);
                        });
                   });
               }
           } catch (error) {
               console.error("Error fetching user: ", error);
           }
       }
    }

    //Adding card by concatenating 
    const addCard = async (type: string) => {

        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async (doc) => {
                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQuestionCollectionRef = collection(db, 'edittingsurveys', surveyID, 'questions');

                        // Create a new Question
                        const newQuestionID = await addDoc(nestedQuestionCollectionRef, {
                            title: questionTitle,
                            type: type,
                            answers: questionAnswers ,
                        });

                        updateDoc(newQuestionID, {
                            id: newQuestionID.id,
                        })

                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
    }

    // Use HTML DOM to control the margin of card wrapper
    const titleRef = useRef<HTMLElement | null>(null);
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);

    //Run effect whenever the title or description is updated
    useEffect(() => {
        
        // For BACKEND
        
        // Fetching all details of the editting survey
        //fetchEdittingSurvey();

        async function fetchData() {
            const newQuestion = await fetchEdittingSurvey();
            setQuestions(newQuestion);
        }
        fetchData();

        // For PREVIEW
        if (titleRef.current && cardWrapperRef.current) {
            // Calculate the height of the title div
            const titleHeight = titleRef.current.offsetHeight;

            // Set the margin-top of the card-wrapper based on title height
            cardWrapperRef.current.style.marginTop = `${titleHeight + 20}px`; 
        }
    }, []);

    return (
      <div className="page-body">
        <NavbarComponent />
        <nav className="top-menu-wrapper">
            <NavLink to="/survey-editor" className={({isActive}) => (isActive ? "link active" : "link")}> Editor </NavLink>
            <NavLink to="/survey-preview" className={({isActive}) => (isActive ? "link active" : "link")}> Preview </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Theme </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Settings </NavLink>
        </nav>

        <div className="editor">
             <div className="side-menu">
                <ul>
                    <li><a href="#" onClick={() => {
                        setType("Multiple Choice");
                        addCard("Multiple Choice");
                    }}>
                        <img src={RadioButtonIcon} /> Multiple choice</a></li>

                    <li><a href="#" onClick={() => {
                        setType("Checkboxes");
                        addCard("Checkboxes");
                    }}>
                        <img src={CheckBoxesIcon} /> Checkboxes</a></li>

                    <li><a href="#" onClick={() => {
                        setType("Dropdown");
                        addCard("Dropdown");
                    }}>
                        <img src={DropDownIcon} /> Dropdown</a></li>

                    <li><a href="#" onClick={() => {
                        setType("File Upload");
                        addCard("File Upload");
                    }}>
                        <img src={FileUploadIcon} /> File upload</a></li>
                </ul>
            </div>


            <div className="main-workspace">
                <div ref={(el) => (titleRef.current = el)} className="title">
                <ContentEditable
                    html={surveyTitle} // Set the HTML content
                    onChange={handleTitleChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="borderless-input survey-title"
                />
                <ContentEditable
                    html={surveyDescription} // Set the HTML content
                    onChange={handleDescriptionChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="borderless-input description"
                />
                    <hr></hr>
                </div>

                {/* Sortable question cards */} 
                <div ref={(el) => (cardWrapperRef.current = el)} className="card-wrapper">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}  
                    >  
                    
                        <SortableContext
                            items={questions}
                            strategy={verticalListSortingStrategy}
                        >
                                {questions.map(question => <SortableCard key={question.id} id={question.id} title={question.title} answers={question.answers} deleted={removeCard} type={question.type} />)}
                        </SortableContext>
                        
                    </DndContext>

                    {/* Function to add card by concatenating without predefined input type */}
                    <div className="adding-function" onClick={() => {
                        setType(undefined);
                        addCard("undefined");
                    }}>
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <span style={{"marginLeft": "5px"}}>Add Card</span>
                    </div>

                    
                </div>
            
            </div>
        </div>
        
      </div>
    );

}

export default SurveyEditor;