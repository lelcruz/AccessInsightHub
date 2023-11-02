import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './SurveyTemplate.scss';
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import SortableCard from "./SortableCard";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import RadioButtonIcon from "../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../assets/folder-upload-svgrepo-com.svg";

function SurveyPreview(){
    
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
            <NavLink to="/survey-editor" className={({isActive}) => (isActive ? "link active" : "link")}> Editor </NavLink>
            <NavLink to="/survey-preview" className={({isActive}) => (isActive ? "link active" : "link")}> Preview </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Theme </NavLink>
            <NavLink to="/main" className={({isActive}) => (isActive ? "link active" : "link")}> Settings </NavLink>
        </nav>

        <div className="editor">
            <div className="main-workspace preview">
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


                </div>
            
            </div>
        </div>
        
      </div>
    );

}

export default SurveyPreview;