import React, {useState, useEffect, useRef} from 'react';
import {NavLink} from "react-router-dom";
import './SurveyTemplate.scss';
import NavbarComponent from "../../../CommonComponents/Navbar/NavbarComponent";
import SortableCard from "./SortableCard";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import RadioButtonIcon from "../../../assets/radio-button-checked-svgrepo-com.svg";
import CheckBoxesIcon from "../../../assets/checkbox-svgrepo-com.svg";
import DropDownIcon from "../../../assets/circle-arrow-up-svgrepo-com.svg";
import FileUploadIcon from "../../../assets/folder-upload-svgrepo-com.svg";
import {useTitleDescription} from  "./Context";
import ContentEditable from "react-contenteditable";

interface SurveyProps{    
    title: string;
    description: string;
    questions: string[];
}

function SurveyEditor(){

    const [type, setType] = useState<string>();
    const [questions, setQuestion] = useState([1]);
    const [query, setQuery] = useState<string>();
    //Synchronize the information entered to preview page
    const { title, setTitle, description, setDescription } = useTitleDescription();

  
    // Function to handle changes
    const handleTitleChange = (e: React.FormEvent<HTMLDivElement>) => {
        const enteredTitle = e.currentTarget.textContent || "";
        setTitle(enteredTitle);
    }

    const handleDescriptionChange = (e: React.FormEvent<HTMLDivElement>) => {
        const enteredDescription = e.currentTarget.textContent || "";
        setDescription(enteredDescription);
    }

     // Use HTML DOM to control the margin of card wrapper
    const titleRef = useRef<HTMLElement | null>(null);
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);

    //Run effect whenever the title or description is updated
    useEffect(() => {
        if (titleRef.current && cardWrapperRef.current) {
            // Calculate the height of the title div
            const titleHeight = titleRef.current.offsetHeight;

            // Set the margin-top of the card-wrapper based on title height
            cardWrapperRef.current.style.marginTop = `${titleHeight + 20}px`; 
        }
    }, [title, description]);


    //Handle onDragEnd attribute of sortable cards
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

    //Adding card by concatenating 
    function addCard (){
        //Get the biggest id number to avoid repetition due to sorting cards
        let biggest= Math.max(...questions);
        console.log("biggest " + biggest);
        setQuestion([...questions, ++biggest]);
        console.log("updatedId: " + biggest);
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
             <div className="side-menu">
                <ul>
                    <li><a href="#" onClick={() => {
                        setType("Multiple Choice");
                        addCard();
                    }}>
                        <img src={RadioButtonIcon} /> Multiple choice</a></li>

                    <li><a href="#" onClick={() => {
                        setType("Checkboxes");
                        addCard();
                    }}>
                        <img src={CheckBoxesIcon} /> Checkboxes</a></li>

                    <li><a href="#" onClick={() => {
                        setType("Dropdown");
                        addCard();
                    }}>
                        <img src={DropDownIcon} /> Dropdown</a></li>

                    <li><a href="#" onClick={() => {
                        setType("File Upload");
                        addCard();
                    }}>
                        <img src={FileUploadIcon} /> File upload</a></li>
                </ul>
            </div>


            <div className="main-workspace">
                <div ref={(el) => (titleRef.current = el)} className="title">
                <ContentEditable
                    html={title} // Set the HTML content
                    onChange={handleTitleChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="borderless-input survey-title"
                />
                <ContentEditable
                    html={description} // Set the HTML content
                    onChange={handleDescriptionChange} // Handle changes
                    tagName="div" // Set the HTML tag name
                    className="borderless-input description"
                />
                    <hr></hr>
                </div>

                {/* Sortable question cards */} 
                <div ref={(el) => (cardWrapperRef.current = el)} className="card-wrapper">
                    <DndContext
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}  
                    >  
                    
                        <SortableContext
                            items={questions}
                            strategy={verticalListSortingStrategy}
                        >
                                {questions.map(question => <SortableCard key={question} id={question} deleted={removeCard} type={type} />)}
                        </SortableContext>
                        
                    </DndContext>

                    {/* Function to add card by concatenating without predefined input type */}
                    <div className="adding-function" onClick={() => {
                        setType(undefined);
                        addCard();
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

export default SurveyEditor;