import React, { useEffect } from 'react';
import "./FormBuilder.scss";
import { useState } from 'react';
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from '../../configurations/firebase';

interface Answer {
  id: number;
  option: string;
}

interface FormProps {
    handleAnswers: (answers: string[]) => void;
}

export function RadioForm(props: FormProps) {

    // FRONT
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [surveyID, setSurveyID] = useState("");
  
    const handleRemove = (id: number) => {
      setAnswers(answers.filter(answer => answer.id !== id));
    };
  
    const handleOptionChange = (id: number, newOption: string) => {
      setAnswers(answers.map(answer => (answer.id === id ? { ...answer, option: newOption } : answer)));
    };
  
    const surveyIDWorkingOn = () => surveyID;
  
    const addOption = () => {
      let id = answers.length + 1;
      setAnswers([...answers, { id: id++, option: "Option " + (id-1)}]);
      console.log(answers)
    };

    // BACK
    const updateEdittingCard = async () => {
        const user = auth.currentUser;

        if (user) {
            // Initilize a card users working on
            
            const docRef = await addDoc(collection(db, "edittingcards"), {

            });
    }   
    }





    const fetchEdittingCard = async () => {

    }



    useEffect(() => {
        fetchEdittingCard();
    }, []); 

    return (
        <form>
            {answers.map((answer) => (
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
