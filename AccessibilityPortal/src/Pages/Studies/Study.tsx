import React, { useState } from 'react';
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";

interface StudyProps {
  uid: string;
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

  const handleEdit = (studyId: string) => {
    
    console.log(`Editing study with id: ${studyId}`);




  };

  const handleDelete = async (studyId: string) => {
    try {
      //await deleteDoc(doc(db, "studies", studyId));
       //Assuming your data in the state is an array, you need to remove the deleted study
      
    } catch (error) {
      console.error("Error deleting study:", error);
  }

    console.log(`Try Deteling study with id: ${studyId}`);
  };

  return (
    <div className="central-content">
      <div className="section">
        <h1>{props.title}</h1>
        <h3>Source: {props.author}</h3>
        <h6>Author's email: {props.email}</h6>
      </div>
      <div>
          <button onClick={() => handleEdit(props.uid)}>Edit</button>
          <button onClick={() => handleDelete(props.uid)}>Delete</button>
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
