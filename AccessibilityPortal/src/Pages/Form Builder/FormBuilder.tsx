import React from "react";
import RadioForm from "./RadioForm";
import CheckboxForm from "./CheckboxForm";
import SelectForm from "./SelectForm";
import FileForm from "./FileForm";

interface FormProps{
    FormType: string | undefined;   //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";
    setAnswers: (answers: string[]) => void
}

function FormBuilder(props: FormProps) {

    const handleAnswers = (answers: string[]) => {
        props.setAnswers(answers);
    };

    if (props.FormType === "Multiple Choice") {
        return <RadioForm handleAnswers={handleAnswers} />;
    }

    if (props.FormType === "Checkboxes") {
        return <CheckboxForm handleAnswers={handleAnswers} />;
    }

    if (props.FormType === "Dropdown") {
        return <SelectForm handleAnswers={handleAnswers} />;
    }

    if (props.FormType === "File Upload") {
        return <FileForm handleAnswers={handleAnswers} />;
    }

    return null;
        
}

export default FormBuilder;