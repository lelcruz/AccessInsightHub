import React, { useState } from 'react';

interface StudyProps {
  title: string;
  author: string;
  email: string;
  type: string;
  date: Date;
  description: string;
}

export const Study = (props: StudyProps) => {
  const [showMore, setShowMore] = useState(false);
  const formattedDate = props.date.toLocaleString();

  const shortenedDescription = props.description.slice(0, 300); // Limiting to 100 characters

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="central-content">
      <div className="section">
        <h1>{props.title}</h1>
        <h3>Source: {props.author}</h3>
        <h6>Author's email: {props.email}</h6>
      </div>
      <div className="section">
        <p>Type: {props.type}</p>
        <p>Date: {formattedDate}</p>
        <h3>Description</h3>
        <hr />
        <p className="lh-lg">
          {showMore ? props.description : shortenedDescription}
        </p>
        {props.description.length > 100 && (
          <button onClick={toggleDescription}>
            {showMore ? "Less..." : "More..."}
          </button>
        )}
      </div>
    </div>
  );
};
