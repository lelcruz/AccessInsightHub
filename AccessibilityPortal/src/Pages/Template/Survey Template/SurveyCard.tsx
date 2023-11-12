import React, {useState} from "react";
import "./QuestionCard.scss";
import {useQuery} from "./Context";

//interface SurveyCardProps{
    //question: string;
    //answers: string[];
//}

function SurveyCard() {

    const {query} = useQuery();

    return (
        <div className="question-card">
            <div className="card">
                <div className="card-body">
                    <div className="question" aria-label="Question">{query}</div>
                    <div className="answer">
                       
                        
                    </div>  
                </div>
            </div>
        </div>
    )
}
export default SurveyCard;