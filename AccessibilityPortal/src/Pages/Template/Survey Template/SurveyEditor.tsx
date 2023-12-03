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
    answers: Answer[];
    order: number;
}

export interface Answer {
    id: number;
    option: string;
}

function SurveyEditor(){

    const [type, setType] = useState<string>();
    const [questionTitle, setQuestionTitle] = useState("");
    const [questionAnswers, setQuestionAnswers] = useState<Answer[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [surveyAuthor, setSurveyAuthor] = useState("");
    const [surveyTitle, setSurveyTitle] = useState("");
    const [surveyDescription, setSurveyDescription] = useState("");
    const [reload, setReload] = useState<boolean>(false);
    const navigate = useNavigate();

    const triggerReload = () => {
        setReload(prev => !prev); // Toggle the reload state
    };

    const directToSurveyTemplate = () => {
        navigate('/survey-simple')
      }

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
                    nestedSnapshot.forEach(async (doc) => {

                        const answerCollection = collection(doc.ref,'answers');
                        const answerCollectionSnapshot = await getDocs(answerCollection);
                        console.log(answerCollectionSnapshot.size)
                        answerCollectionSnapshot.forEach((answer) => {

                            console.log("ID: " + answer.data().id)
                            console.log("TEXT: " + answer.data().option) 
                            const newAnswer: Answer = {
                                id: answer.data().id as number,
                                option: answer.data().option as string,
                            }
                            console.log("ID of new: " + newAnswer.id)
                            console.log("TEXT of new: " + newAnswer.option) 
                            setQuestionAnswers(prevAnswers => [...prevAnswers, newAnswer]);
                        
                        });
                        console.log("LENGTH A: " + questionAnswers.length)
                        questionAnswers.forEach((e) => {
                            console.log("ID in loop: " + e.id)
                        })
                        
                        const newQuestion: Question = {
                            id: doc.data().id as string,
                            type: doc.data().type as string,
                            title: doc.data().title as string,
                            answers: questionAnswers,
                            order: doc.data().order as number,
                        };
                
                        // Update the questions state by adding the new question
                        setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
                        console.log("LENGTH Q: " + questions.length)
                        questions.forEach((e) => {
                            console.log("ID in loop: " + e.id)
                        })
                    });

                    setQuestionAnswers([]);
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
    function handleDragEnd(event: any) {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            setQuestions((items) => {
                const activeIndex = items.findIndex(item => item.id === active.id);
                const overIndex = items.findIndex(item => item.id === over.id);
                const updatedItems = arrayMove(items, activeIndex, overIndex);
                
                // Update order based on the new position
                updatedItems.forEach(async (item, index) => {
                    console.log(item.id)
                    console.log(item.order)
                    console.log(index)
                    item.order = index;

                    const user = auth.currentUser;
                    if (user) {
                        try {
                            const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                            const querySnapshot = await getDocs(q);
                            if (!querySnapshot.empty) {
                                querySnapshot.forEach((e) => {
                                    const nestedDocRef = doc(db, 'edittingsurveys', e.id, 'questions', item.id); // Fetch the order of questions
                                    updateDoc(nestedDocRef, {
                                        order: item.order,
                                      })
                                        .then(() => {
                                          console.log('Order updated successfully!');
                                        })
                                        .catch((error) => {
                                          console.error('Error updating order: ', error);
                                        });
                                });
                            }
                        } catch (error) {
                            console.error("Error fetching user: ", error);
                            navigate('/template');
                        }
                    }
                    console.log("DONE CHANGING ORDER")
                });
  
                return updatedItems;
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

                       // Remove the question
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

       // After the card is successfully deleted, update the order of remaining questions
    setQuestions(prevQuestions => {
        const updatedQuestions = prevQuestions.filter(question => question.id !== id);

        // Re-index the remaining questions
        updatedQuestions.forEach(async (question, index) => {
            question.order = index;
            const user = auth.currentUser;
            if (user) {
                try {
                    const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        querySnapshot.forEach((e) => {
                            const nestedDocRef = doc(db, 'edittingsurveys', e.id, 'questions', question.id);
                            updateDoc(nestedDocRef, { order: question.order })
                                .then(() => {
                                    console.log('Order updated successfully!');
                                })
                                .catch((error) => {
                                    console.error('Error updating order: ', error);
                                });
                        });
                    }
                } catch (error) {
                    console.error("Error fetching user: ", error);
                    navigate('/template');
                }
            }
        });

        return updatedQuestions;

    });
    
       triggerReload();
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
                            order: questions.length,
                        });

                        // Create a new 'answers' subcollection inside the newly created question
                        if (newQuestionID) {
                            const answersCollectionRef = collection(newQuestionID, 'answers');
                            await addDoc(answersCollectionRef, {
                                id: 0,
                                option: 'Answer 0',
                            });
                        }

                        updateDoc(newQuestionID, {
                            id: newQuestionID.id,
                        })

                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }

        triggerReload();
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

        // Reloading when changes happen
        if(reload) {
            fetchData();
            setReload(false)
        }

        // For PREVIEW
        if (titleRef.current && cardWrapperRef.current) {
            // Calculate the height of the title div
            const titleHeight = titleRef.current.offsetHeight;

            // Set the margin-top of the card-wrapper based on title height
            cardWrapperRef.current.style.marginTop = `${titleHeight + 20}px`; 
        }
    }, [reload]);

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
            <button type="button" className="btn btn-outline-dark" onClick={directToSurveyTemplate}>
                    Use your existing survey
                </button> 
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
                        {questions
                            .sort((a, b) => a.order - b.order)
                            .map(question => (
                                <SortableCard
                                    key={question.id}
                                    id={question.id}
                                    title={question.title}
                                    answers={question.answers}
                                    deleted={removeCard}
                                    type={question.type}
                                    order={question.order}
                                />
                        ))}
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