import React, {useState} from 'react';
import './SurveyTemplate.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import Container from "react-bootstrap/Container";
import SortableCard from "./SortableCard";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import RadioButtonIcon from "../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../assets/folder-upload-svgrepo-com.svg";
import Logout from "../../Pages/LogoutPage/logout";

function TemplatePage(){
    
    const [questions, setQuestion] = useState([1]);

    function handleDragEnd(e: any) {
        console.log("Drag end called");
        const {active, over} = e;
        console.log("ACTIVE: ", + active.id);
        console.log("OVER: ", + over.id);

        if (over && active.id !== over.id) {
            setQuestion((items) => {
                const activeIndex = items.indexOf(active.id);
                const overIndex = items.indexOf(over.id);
                return arrayMove(items, activeIndex, overIndex);
            });
        }
    }

    //Remove card from question list by filtering its id number
    function removeCard (id: number){
        setQuestion(questions.filter(question => question !== id));
            
    }

    return (
      <div className="page-body">
        <NavbarComponent />
        <nav className="top-menu-wrapper">
            <a> Editor</a>
            <a> Preview</a>
            <a> Theme</a>
            <a> Settings</a>
        </nav>

        <div className="editor">
            <div className="side-menu">
                <ul>
                    <li><a href="#">
                        <img src={RadioButtonIcon} /> Multiple choice</a></li>
                    <li><a href="#">
                        <img src={CheckBoxesIcon} /> Checkboxes</a></li>
                    <li><a href="#">
                        <img src={DropDownIcon} /> Dropdown</a></li>
                    <li><a href="#">
                        <img src={FileUploadIcon} /> File upload</a></li>
                </ul>
            </div>

            <div className="main-workspace">
                <div className="title">
                    <div className="borderless-input survey-title" aria-label="Survey-Title" role="textbox" contentEditable="true" aria-multiline="true"/>
                    <div className="borderless-input description" aria-label="Description" role="textbox" contentEditable="true" aria-multiline="true"  />
                    <hr></hr>
                </div>

                {/* Sortable question cards */} 
                <div className="card-wrapper">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}  
                    >  
                    
                        <SortableContext
                            items={questions}
                            strategy={verticalListSortingStrategy}
                        >
                                {questions.map(question => <SortableCard key={question} id={question} deleted={removeCard}/>)}
                        </SortableContext>
                        
                    </DndContext>

                    {/* Function to add card by concatenating */}
                    <div className="adding-function" onClick={() => {
                        let lastId = questions.length;
                        setQuestion([...questions, ++lastId]);
                        console.log(questions);
                       }}>
                         
                        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        <span style={{"marginLeft": "5px"}}>Add Card</span>
                    </div>

                </div>
            
            </div>
        </div>
        
      </div>
    );

}

export default TemplatePage;