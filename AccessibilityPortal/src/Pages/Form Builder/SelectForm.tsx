import React, {useState} from "react";
import "./FormBuilder.scss";

interface Answer {
    id: number;
    option: string;
}

interface FormProps {
    handleAnswers: (answers: string[]) => void;
    // Other necessary props specific to the form component
}

export function SelectForm(props: FormProps) {

    const [answers, setAnswer] = useState<Answer[]>([]);

    const handleRemove = (id: number) => {
        setAnswer(answers.filter(answer => answer.id !== id));
    };

    return(
        <form>
                {answers.map((answer) => {
                    return (
                        <>
                            {/*<input type="select" key={answer.id}/> */}
                            <label className="option" role="textbox" contentEditable="true" aria-multiline="true" placeholder={`${answer.option} ${answer.id}`}>
                                {/* {`${answer} ${++index}`}*/}
                            </label>
                            <button type="button" className="remove-button" onClick={() => {handleRemove(answer.id)}}>&times;</button>

                        </>
                    );
                })}

                
                <label className="option" style={{"color" : "gray"}} aria-label="Answer" role="textbox"  
                    onClick={() => {
                        let id = answers.length + 1;
                        setAnswer([...answers, {id: id++, option: "Option"}]);
                    }}>
                    Add Option
                </label>
        </form>
    )
}

export default SelectForm;