import React from "react";

interface StudyProps {
    titleElement: JSX.Element;
    author: string;
    email: string;
    type: string;
    date: Date;
    description: string;
    tag: string;
    requirement: string;
}

export const Study = (props: StudyProps) => {
    const formattedDate = props.date.toLocaleString();
    return (
        <div className="central-content">
            <div className="section">
                <h1>{props.titleElement}</h1>
                <h3>Author: {props.author}</h3>
                <h6>{props.email}</h6>
                <h6>Requirement: {props.requirement}</h6>
                <h6>Tag: {props.tag}</h6>
                <h6>Type: {props.type} </h6>
                <h3>Description</h3>
                <hr/>
                <p className="lh-lg">{props.description}</p>
                <hr/>
                <h6>Date: {formattedDate}</h6>
            </div>
        </div>
    );
};
