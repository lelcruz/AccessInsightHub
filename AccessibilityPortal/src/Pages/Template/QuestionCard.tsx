import React from "react";
import "./QuestionCard.scss";

function QuestionCard(){
    return(
        <div className="card-wrapper">
            <div className="card">
                <div className="card-header">
                    <div className="question" aria-label="Question" role="textbox" contentEditable="true" aria-multiline="true" />
                </div>
                <div className="card-body">
                    <div className="answer">
                        
                    </div>
                </div>
                <div className="card-footer"> Function</div>
            </div>
        </div>
    );
}
export default QuestionCard;