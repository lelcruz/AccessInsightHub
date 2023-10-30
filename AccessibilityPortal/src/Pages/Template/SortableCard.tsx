import React, {useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import FormBuilder from "../Form Builder/FormBuilder";
import "./QuestionCard.scss";
import DraggableIcon from "../../assets/grip-horizontal-s.svg";
import RadioButtonIcon from "../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../assets/folder-upload-svgrepo-com.svg";
import DeleteIcon from "../../assets/delete-recycle-bin-trash-can-svgrepo-com.svg";

interface SortableItemProps{
    id: number;
    deleted: (id: number) => void;
}

function SortableCard(props: SortableItemProps) {
    
    const [questionType, setQuestionType] = useState<string>("");

    const selectedType = (questionType: string) => {
        setQuestionType(questionType);
    }

    const {
        attributes,
        listeners,
        setNodeRef,
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

     
     return(
        <div ref={setNodeRef} style={style}>
            <div className="question-card">
            <div className="card">
                <div className="card-header" {...listeners}>
                    <img src={DraggableIcon} {...attributes}/>
                </div>
                <div className="card-body">
                    <div className="question" aria-label="Question" role="textbox" contentEditable="true" aria-multiline="true" />
                    <div className="answer">
                        <FormBuilder FormType={questionType} />
                        
                    </div>  
                </div>
                <div className="card-footer"> 
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {questionType === "" ? "Input Type" : questionType}
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a className="dropdown-item" href="#" onClick={() => {selectedType("Multiple Choice")}}>
                               <img src={RadioButtonIcon} /> Multiple choice</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {selectedType("Checkboxes")}}>
                                <img src={CheckBoxesIcon} /> Checkboxes</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {selectedType("Dropdown")}}>
                                <img src={DropDownIcon} /> Dropdown</a></li>
                            <li><a className="dropdown-item" href="#" onClick={() => {selectedType("File Upload")}}>
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