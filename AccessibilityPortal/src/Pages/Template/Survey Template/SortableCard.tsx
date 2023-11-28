import React, {useState, useEffect} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import FormBuilder from "../../Form Builder/FormBuilder";
import { addDoc, collection, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from '../../../configurations/firebase';
import "./QuestionCard.scss";
import DraggableIcon from "../../../assets/grip-horizontal-s.svg";
import RadioButtonIcon from "../../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../../assets/folder-upload-svgrepo-com.svg";
import DeleteIcon from "../../../assets/delete-recycle-bin-trash-can-svgrepo-com.svg";
import ContentEditable from "react-contenteditable";
import {Answer} from "./SurveyEditor"


interface SortableItemProps{
    id: string;
    deleted: (id: string) => void;
    type?: string | undefined;      //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";  
    query?: string | undefined;
    title?: string;
    answers?: Answer[]; 
    order: number;
}

function SortableCard(props: SortableItemProps) {
    
    const [questionType, setQuestionType] = useState<string>();
    const [questionID, setQuestionID] = useState<string>();
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionOrder, setQuestionOrder] = useState(0);
    const [questionAnswers, setQuestionAnswers] = useState<Answer[]>([]);

    const fetchEdittingQuestion = async () => {

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
                    const surveyID = doc.id; // Replace with the survey's ID
                    const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.id));

                    getDocs(nestedQ)
                        .then((querySnapshot) => {
                            querySnapshot.forEach(async (doc) => {
                                const answerCollection = collection(doc.ref, 'answers');
                                const answerCollectionSnapshot = await getDocs(answerCollection);
                                answerCollectionSnapshot.forEach((answer) => {
                                    
                                    const newAnswer: Answer = {
                                        id: answer.data().id as number,
                                        option: answer.data().option as string,
                                    }
                                    
                                    setQuestionAnswers(prevAnswers => [...prevAnswers, newAnswer]);
                                });
                               
                                // Info
                                setQuestionTitle(doc.data().title)
                                setQuestionID(doc.data().id)
                                setQuestionType(doc.data().type)
                                setQuestionOrder(doc.data().order)
                                
                    
                            });
                        })
                        .catch((error) => {
                            console.error('Error updating documents: ', error);
                        });
                });      
            } catch (error) {
                console.error("Error fetching question title & answers: ", error);
            }
        }
    }

    // Function to handle receiving answers from FormBuilder
    const handleFormAnswers = async (answers: Answer[]) => {
        setQuestionAnswers(answers);
        

    };

    const handleTitleChange = async (e: React.FormEvent<HTMLDivElement>) => {
        const enteredQuestion = e.currentTarget.textContent || "";
        setQuestionTitle(enteredQuestion);
        
        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {

                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.id));

                       getDocs(nestedQ)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                            // Update the question's title
                            updateDoc(doc.ref, {
                                title: enteredQuestion,
                            })
                                .then(() => {
                                    //console.log("Document updated successfully with new title.");
                                })
                                .catch((error) => {
                                    console.error("Error updating question's title:", error);
                                });
                            });
                        })
                        .catch((error) => {
                            console.error("Error updating question's title: ", error);
                        });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }

    };

    const handleTypeChange = async (type: string) => {
    
        setQuestionType(type);
        
        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {

                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.id));

                       getDocs(nestedQ)
                        .then((querySnapshot) => {
                            querySnapshot.forEach((doc) => {

                            // Update the question's title
                            updateDoc(doc.ref, {
                                type: type,
                            })
                                .then(() => {
                                    //console.log("Document updated successfully with new title.");
                                })
                                .catch((error) => {
                                    console.error("Error updating question's type:", error);
                                });
                            });
                        })
                        .catch((error) => {
                            console.error("Error updating question's type: ", error);
                        });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
    };

    const {
        attributes: draggableAttributes,
        listeners: draggableListeners,
        setNodeRef: draggableNodeRef,
        transform,
        transition
     } = useSortable({id: props.id});

     const style = {
        transform: CSS.Transform.toString(transform),
        transition
     }

     const handleDelete = () => {
        props.deleted(props.id);
     }

    //Return the card with specified question type from side menu
    useEffect(() => {
        if(props.type !== undefined){
            setQuestionType(props.type);
        }

        fetchEdittingQuestion();
    }, []);


     return(
        <div ref={draggableNodeRef} style={style}>
            <div className="question-card">
            <div className="card">
                <div className="card-header" {...draggableListeners}>
                    <img src={DraggableIcon} {...draggableAttributes}/>
                </div>
                <div className="card-body">
                <ContentEditable
                    html={questionTitle} // Set the HTML content
                    onChange={handleTitleChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="question"
                />
                    <div className="answer">
                        <FormBuilder FormType={questionType} questionID={questionID} questionAnswers={questionAnswers} />
                
                    </div>  
                </div>
                <div className="card-footer"> 
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {questionType === undefined ? "Input Type" : questionType}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#" onClick={() => {handleTypeChange("Multiple Choice")}}>
                               <img src={RadioButtonIcon} /> Multiple choice</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {handleTypeChange("Checkboxes")}}>
                                <img src={CheckBoxesIcon} /> Checkboxes</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {handleTypeChange("Dropdown")}}>
                                <img src={DropDownIcon} /> Dropdown</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {handleTypeChange("File Upload")}}>
                                <img src={FileUploadIcon} /> File upload</a></li>
                        </ul>
                    </div>
                        <div className="footer-menu">
                            <img src={DeleteIcon} onClick={handleDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );

}
export default SortableCard;