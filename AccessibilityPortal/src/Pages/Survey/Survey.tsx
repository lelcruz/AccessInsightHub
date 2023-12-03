import React from "react";

interface SurveyProps {
  title: string;
  author: string;
  email: string;
  requirement: string;
  tag: string;
  date: Date;
  description: string;
  link: string;
}

export const Survey = (props: SurveyProps) => {
    const formattedDate = props.date.toLocaleString();
    return (
      <div className="central-content">
          <div className="section">
              <h1>{props.title}</h1>
              <h3>Author: {props.author}</h3>
              <h6>{props.email}</h6>
              <a href={props.link} target="_blank">Link to the survey</a>
              <h6>Requirement: {props.requirement}</h6>
              <h6>Tag: {props.tag}</h6>
              <h3>Description</h3>
              <hr/>
              <p className="lh-lg">{props.description}</p>
              <hr/>
              <h6>Date: {formattedDate}</h6>
          </div>
      </div>
  );
};
