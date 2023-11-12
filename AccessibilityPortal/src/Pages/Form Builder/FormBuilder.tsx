import React from "react";
import RadioForm from "./RadioForm";
import CheckboxForm from "./CheckboxForm";
import SelectForm from "./SelectForm";
import FileForm from "./FileForm";

interface FormProps{
    FormType: string | undefined;   //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";
}

function FormBuilder(props: FormProps) {
    if (props.FormType === "Multiple Choice" ){
        return <RadioForm />;
    }

    if (props.FormType === "Checkboxes"){
        return <CheckboxForm />;
    }

    if (props.FormType === "Dropdown"){
        return <SelectForm />;
    }

    if(props.FormType === "File Upload"){
        return <FileForm />;
    }

    return null;
        
}

export default FormBuilder;