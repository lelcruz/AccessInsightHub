import {doc, updateDoc, deleteDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from '../../configurations/firebase';

interface StudyProps {
    id: string;
    title: string;
    author: string;
    email: string;
    type: string;
    date: Date;
    description: string;
    tag: string;
    requirement: string;
    triggerReload: () => void;
}

export const Study = (props: StudyProps) => {

    const formattedDate = props.date.toLocaleString();
    const [isEditing, setIsEditing] = useState(false);
    const [deleteChosen, setDeleteChosen] = useState(false);

    // Survey's data for editting
    const [editedTitle, setEditedTitle] = useState(props.title);
    const [editedAuthor, setEditedAuthor] = useState(props.author);
    const [editedEmail, setEditedEmail] = useState(props.email);
    const [editedRequirement, setEditedRequirement] = useState(props.requirement);
    const [editedTag, setEditedTag] = useState(props.tag);
    const [editedDescription, setEditedDescription] = useState(props.description);
    const [editedType, setEditedType] = useState(props.type);

    const editClicked = () => {
        setIsEditing(true);
      }
    
    const handleCancel = () => {
    setIsEditing(false);
    setDeleteChosen(false);
    }

    const deleteClicked = () => {
    setDeleteChosen(true);
    }
    
    const handleSave = async () => {
    try {
        const studyDocRef = doc(db, "studies", props.id); 

        // Update the document fields with the edited values
        await updateDoc(studyDocRef, {
            title: editedTitle,
            author: editedAuthor,
            email: editedEmail,
            requirement: editedRequirement,
            tag: editedTag,
            description: editedDescription,
            type: editedType,
        });

        setIsEditing(false);
        props.triggerReload();
        console.log("Study successfully updated!");
    } catch (error) {
        console.error("Error updating Study: ", error);
    }
    };

    const handleDeletion = async () => {
    try {
        // Reference to the document in Firestore using its ID (props.id)
        const studyDocRef = doc(db, "studies", props.id);
        await deleteDoc(studyDocRef); // Delete from Firebase Database
        props.triggerReload();
        console.log("Study successfully deleted!");
        setDeleteChosen(false);
    } catch (error) {
        console.error("Error removing Study: ", error);
    }
    }

    return (
        <div className="central-content">
        <div className="section">
          {/* Display editable fields if in edit mode */}
          {isEditing ? (
            <div>
              <tr>
                <th scope="row">Title</th>
                <input
                  type="text"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Author</th>
                <input
                  type="text"
                  value={editedAuthor}
                  onChange={(e) => setEditedAuthor(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Email</th>
                <input
                  type="text"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Requirement</th>
                <input
                  type="text"
                  value={editedRequirement}
                  onChange={(e) => setEditedRequirement(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Tag</th>
                <input
                  type="text"
                  value={editedTag}
                  onChange={(e) => setEditedTag(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Description</th>
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                />
              </tr>
              <tr>
                <th scope="row">Type</th>
                <input
                  type="text"
                  value={editedType}
                  onChange={(e) => setEditedType(e.target.value)}
                />
              </tr>
              <button type="button" className="btn btn-outline-dark" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn btn-outline-dark" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : deleteChosen ? (
            <div>
              <p>Are you sure you want to delete this study?</p>
              <button type="button" className="btn btn-outline-dark" onClick={handleDeletion}>
                Yes, Delete
              </button>
              <button type="button" className="btn btn-outline-dark" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          ) : ( 
            <div>
              {/* Display non-editable fields */}
              <h1>{props.title}</h1>
              <h3>Author: {props.author}</h3>
              <h6>{props.email}</h6>
              <h6>Type: {props.type} </h6>
              <h6>Requirement: {props.requirement}</h6>
              <h6>Tag: {props.tag}</h6>
              <h3>Description</h3>
              <hr/>
              <p className="lh-lg">{props.description}</p>
              <hr/>
              <h6>Date: {formattedDate}</h6>
              <button type="button" className="btn btn-outline-dark" onClick={editClicked}>
                Edit
              </button> 
              <button type="button" className="btn btn-outline-dark" onClick={deleteClicked}>
                Delete
              </button> 
            </div>
          )}
        </div>
    </div>
    );
};
