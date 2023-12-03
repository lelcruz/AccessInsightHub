import React, { useEffect } from 'react';
import "./FormBuilder.scss";
import { useState } from 'react';
import { auth, db } from '../../configurations/firebase';
import { addDoc, collection, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {Answer} from "../../Pages/Template/Survey Template/SurveyEditor"

interface RadioFormProps{
    questionID: string | undefined;  
    questionAnswers: Answer[] | undefined;  
}

function RadioForm(props: RadioFormProps) {

    // FRONT
    const [questionAnswers, setQuestionAnswers] = useState<Answer[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    const [id, setID] = useState(0);

    const triggerReload = () => {
        setReload(prev => !prev); // Toggle the reload state
    };
    
    // BACK
    const fetchEdittingAnswers = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email)); 
                const querySnapshot = await getDocs(q);

                if (querySnapshot.empty) {
                    throw new Error("No matching documents found"); // Throw an error if the query is empty
                }
                // Process the query results if not empty
                querySnapshot.forEach(async (e) => {
                    const surveyID = e.id; // Replace with the survey's ID
                    const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.questionID));

                    const nestedQuerySnapshot = await getDocs(nestedQ)
                        .then((nestedQuerySnapshot) => {
                            nestedQuerySnapshot.forEach(async (q) => {
                                const answerCollection = collection(q.ref, 'answers');
                                const answerCollectionSnapshot = await getDocs(answerCollection);
                                answerCollectionSnapshot.forEach((answer) => {
                                    
                                    const newAnswer: Answer = {
                                        id: answer.data().id as number,
                                        option: answer.data().option as string,
                                    }
                                    
                                    setQuestionAnswers(prevAnswers => [...prevAnswers, newAnswer]);
                                    
                                });
                                console.log("Fetched: " + questionAnswers.length)
                            });
                        })
                        .catch((error) => {
                            console.error('Error fetching answers: ', error);
                        });
                });      
            } catch (error) {
                console.error("Error fetching answers: ", error);
            }
        }

        return questionAnswers
    } 

    useEffect(() => {
        async function fetchData() {
            const newAnswer = await fetchEdittingAnswers();
            setQuestionAnswers(newAnswer);
        }
        fetchData();

        // Reloading when changes happen
        if(reload) {
            fetchData();
            setReload(false)
        }
     }, [reload]);

    const handleRemove = async (id: number) => {
       
        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async(doc) => {

                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.questionID));

                       const nestQuerySnapshot = await getDocs(nestedQ)
                       .then((nestQuerySnapshot) => {
                        nestQuerySnapshot.forEach(async (doc) => {

                               const answerCollection = query(collection(doc.ref, 'answers'), where("id", "==", id));
                                // Remove the answer
                                const AnswerSnapshot = await getDocs(answerCollection)
                                .then((AnswerSnapshot) => {
                                    AnswerSnapshot.forEach((doc) => {
                                    // Delete the document
                                    deleteDoc(doc.ref)
                                        .then(() => {
                                            console.log('Answer is successfully deleted!');
                                        })
                                        .catch((error) => {
                                            console.error('Error removing Answer: ' + id, error);
                                        });
                           });
                       })
                       .catch((error) => {
                           console.error('Error getting documents: ', error);
                       });
                                });

                           });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }

        setQuestionAnswers(questionAnswers.filter(answer => answer.id !== id));

       // triggerReload()

        console.log("Remove option")
    };
  
    const handleOptionChange = async (id: number, newOption: string) => {

        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async(doc) => {

                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.questionID));

                       await getDocs(nestedQ)
                       .then((querySnapshot) => {
                           querySnapshot.forEach(async (doc) => {

                               const answerCollection = query(collection(doc.ref, 'answers'), where("id", "==", id));
                                // Remove the answer
                                getDocs(answerCollection)
                                .then((querySnapshot) => {
                                    querySnapshot.forEach((e) => {
                                    // Delete the document
                                    updateDoc(e.ref, {
                                        option: newOption,
                                    })
                                        .then(() => {
                                            console.log('Answer is successfully deleted!');
                                        })
                                        .catch((error) => {
                                            console.error('Error removing Answer: ' + id, error);
                                        });
                           });
                       })
                       .catch((error) => {
                           console.error('Error getting documents: ', error);
                       });
                                });

                           });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }
        
        setQuestionAnswers(questionAnswers.map(answer => (answer.id === id ? { ...answer, option: newOption } : answer)));

        console.log("Handle option")
    };
  
    const addOption = async () => {
        setID(questionAnswers.length + 1)
        setQuestionAnswers([...questionAnswers, { id: id, option: "Answer " + id}]);

        // Update to Firebase
        const user = auth.currentUser;
        if (user) {
            try {
                const q = query(collection(db, "edittingsurveys"), where("author", "==", user.email));
                const querySnapshot = await getDocs(q);

                if (!querySnapshot.empty) {
                    querySnapshot.forEach(async(doc) => {

                        const surveyID = doc.id; // Replace with the survey's ID
                        const nestedQ = query(collection(db, 'edittingsurveys', surveyID, 'questions'), where("id", "==", props.questionID));

                       const nestedQuerySnapshot = await getDocs(nestedQ)
                       .then((nestedQuerySnapshot) => {
                                nestedQuerySnapshot.forEach(async (doc) => {

                               const answerCollection = collection(doc.ref, 'answers');
                               await addDoc(answerCollection, {
                                id: id,
                                option: 'Answer ' + id,
                            });

                           });
                       })
                       .catch((error) => {
                           console.error("Error updating question's answers: ", error);
                       });
                    });
                }
            } catch (error) {
                console.error("Error fetching user: ", error);
            }
        }

        //triggerReload()

        console.log("Add option")
    };

    return (
        <form>
            {questionAnswers.map((answer) => (
                <div key={answer.id}>
                <input type="radio" disabled />
                <label
                    className="option"
                    role="textbox"
                    contentEditable
                    aria-multiline
                    placeholder={`${answer.option} ${answer.id}`}
                    onBlur={(e) => handleOptionChange(answer.id, e.currentTarget.innerText)}
                >
                    {answer.option}
                </label>
                <button type="button" className="remove-button" onClick={() => handleRemove(answer.id)}>
                    &times;
                </button>
                </div>
            ))}

            <input type="radio" disabled />
            <label
                className="option"
                style={{ color: "gray" }}
                aria-label="Answer"
                role="textbox"
                onClick={addOption}
            >
                Add Option
            </label>
        </form>
    );
}

export default RadioForm;
