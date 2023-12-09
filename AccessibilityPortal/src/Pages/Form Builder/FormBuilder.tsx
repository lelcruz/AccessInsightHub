import React from "react";
import RadioForm from "./RadioForm";
import {Answer} from "../../Pages/Template/Survey Template/SurveyEditor"

interface FormProps {
    FormType: string | undefined;   //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";
    questionID: string | undefined;
    questionAnswers: Answer[] | undefined;
}

// Component for building different types of form elements based on the specified form type.
function FormBuilder(props: FormProps) {

    if (props.FormType === "Multiple Choice") {
        return <RadioForm questionID={props.questionID} questionAnswers={props.questionAnswers}/>;
    }

    if (props.FormType === "Checkboxes") {
        // return <CheckboxForm handleAnswers={handleAnswers} />;
    }

    if (props.FormType === "Dropdown") {
        //return <SelectForm handleAnswers={handleAnswers} />;
    }

    if (props.FormType === "File Upload") {
        //return <FileForm handleAnswers={handleAnswers} />;
    }

    return null;

}

export default FormBuilder;