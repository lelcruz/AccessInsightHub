import React from "react";

interface StudyProps {
  title: string;
  author: string;
  email: string;
  type: string;
  date: Date;
  description: string;
}

export const Study = (props: StudyProps) => {
  const formattedDate = props.date.toLocaleString();
  return (
    <div className="central-content">
      <div className="section">
        <h1>{props.title}</h1>
        <h3>{props.author}</h3>
        <h6>{props.email}</h6>
      </div>
      <div className="section">
        <p>Type: {props.type}</p>
        <p>Date: {formattedDate}</p>
        <h3>Description</h3>
        <hr />
        <p className="lh-lg">{props.description}</p>
      </div>
    </div>
  );
};
