import React, {useState, useEffect} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {useDroppable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import FormBuilder from "../../Form Builder/FormBuilder";
import { addDoc, collection } from "firebase/firestore"; 
import { db } from "../../../configurations/firebase";
import "./QuestionCard.scss";
import DraggableIcon from "../../../assets/grip-horizontal-s.svg";
import RadioButtonIcon from "../../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../../assets/folder-upload-svgrepo-com.svg";
import DeleteIcon from "../../../assets/delete-recycle-bin-trash-can-svgrepo-com.svg";
import ContentEditable from "react-contenteditable";
//import {useQuery} from "./Context";


interface SortableItemProps{
    id: number;
    deleted: (id: number) => void;
    type?: string | undefined;      //"Multiple Choice" | "Checkboxes" | "Dropdown" | "File Upload";  
    query?: string | undefined;
    answers?: string[]; 
}

function SortableCard(props: SortableItemProps) {
    
    const [questionType, setQuestionType] = useState<string>();
    const [question, setQuestion] = useState<string>("");
    const [answers, setAnswers] = useState<string[]>([]);
    //const {query, setQuery} = useQuery();


    const handleQuestionChange = (e: React.FormEvent<HTMLDivElement>) => {
        const enteredQuestion = e.currentTarget.textContent || "";
        //setQuery(enteredQuestion);
        //props.query = enteredQuestion;
    };


    const selectedType = (questionType: string) => {
        setQuestionType(questionType);
    }

    const {
        attributes: draggableAttributes,
        listeners: draggableListeners,
        setNodeRef: draggableNodeRef,
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

     //Return the card with specified question type from side menu
     useEffect(() => {
        if(props.type !== undefined){
            setQuestionType(props.type);
         }
     }, []);


     return(
        <div ref={draggableNodeRef} style={style}>
            <div className="question-card">
            <div className="card">
                <div className="card-header" {...draggableListeners}>
                    <img src={DraggableIcon} {...draggableAttributes}/>
                </div>
                <div className="card-body">
                <ContentEditable
                    html={question} // Set the HTML content
                    onChange={handleQuestionChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="question"
                />
                    <div className="answer">
                        <FormBuilder FormType={questionType} />
                
                    </div>  
                </div>
                <div className="card-footer"> 
                    <div className="dropdown">
                        <button className="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            {questionType === undefined ? "Input Type" : questionType}
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