import React from "react";
import RadioForm from "./RadioForm";
import CheckboxForm from "./CheckboxForm";
import DropdownForm from "./DropdownForm";

interface FormProps{
    FormType: string;   //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";
}

function FormBuilder(props: FormProps) {
    if (props.FormType === "Multiple Choice" ){
        return <RadioForm />;
    }

    if (props.FormType === "Checkboxes"){
        return <CheckboxForm />;
    }

    if (props.FormType === "Dropdown"){
        return <DropdownForm />;
    }

    return null;
        
}

export default FormBuilder;