import React, {useState} from "react";
import "./FormBuilder.scss";

interface Answer {
    id: number;
    option: string;
}

// Component for a form with dynamic checkboxes.
function CheckboxForm() {
    // State hook for managing the list of answers
    const [answers, setAnswer] = useState<Answer[]>([]);
    //Handles the removal of an answer.
    const handleRemove = (id: number) => {
        setAnswer(answers.filter(answer => answer.id !== id));
    };
    // Rendering the form with the dynamic list of checkboxes
    return (
        <form>
            {answers.map((answer) => {
                return (
                    <>
                        <input type="checkbox" disabled key={answer.id}/>
                        <label className="option" role="textbox" contentEditable="true" aria-multiline="true"
                               placeholder={`${answer.option} ${answer.id}`}>
                            {/* {`${answer} ${++index}`}*/}
                        </label>
                        <button type="button" className="remove-button" onClick={() => {
                            handleRemove(answer.id)
                        }}>&times;</button>

                    </>
                );
            })}

            <input type="checkbox" disabled/>
            <label className="option" style={{"color": "gray"}} aria-label="Answer" role="textbox"
                   onClick={() => {
                       let id = answers.length + 1;
                       setAnswer([...answers, {id: id++, option: "Option"}]);
                   }}>
                Add Option
            </label>
        </form>
    )
}

export default CheckboxForm;