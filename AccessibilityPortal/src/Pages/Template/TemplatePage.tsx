import React, {DragEventHandler, useState, DragEvent} from 'react';
import './SurveyTemplate.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import QuestionCard from "./QuestionCard";
import Container from "react-bootstrap/Container";
import SortableItem from "./SortableItem";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";


function TemplatePage(){
    const [questions, setQuestion] = useState(["One", "Two", "Three", "Four"]);

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
                Menu for drag and drop question creator.
            </div>

            <div className="main-workspace">
                <div className="title">
                    <div className="borderless-input survey-title" aria-label="Survey-Title" role="textbox" contentEditable="true" aria-multiline="true"/>
                    <div className="borderless-input description" aria-label="Description" role="textbox" contentEditable="true" aria-multiline="true"  />
                    <hr></hr>
                </div>

                <div className="card-wrapper">
                    {/* Sortable question cards */}
                    <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}  
                    >  
                        <Container className="p-3" style={{"width": "50%"}}>
                            <SortableContext
                                items={questions}
                                strategy={verticalListSortingStrategy}
                            >
                                    {questions.map(question => <SortableItem key={question} id={question} />)}
                            </SortableContext>
                        </Container>
                    </DndContext>

                    <div className="adding-function">
                        Add Card
                    </div>
                </div>
                
            </div>
        </div>
        
      </div>
    );

}

export default TemplatePage;