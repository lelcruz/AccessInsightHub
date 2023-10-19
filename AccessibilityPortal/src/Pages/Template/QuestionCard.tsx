import React, {useState} from "react";
import "./QuestionCard.scss";
import DraggableIcon from "../../assets/grip-horizontal-s.svg";

interface QuestionCardProps{
    children: string;
}

function QuestionCard(props: QuestionCardProps){

    return(
        <div className="question-card">
            <div className="card">
                <div className="card-header">
                    <img src={DraggableIcon} />
                </div>
                <div className="card-body">
                    <div className="question" aria-label="Question" role="textbox" contentEditable="true" aria-multiline="true" />
                        {props.children}
                </div>
                <div className="card-footer"> Function</div>
            </div>
        </div>
        
       
    );
}
export default QuestionCard;