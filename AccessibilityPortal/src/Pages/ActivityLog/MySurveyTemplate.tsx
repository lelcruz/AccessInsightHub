import {deleteDoc, doc, updateDoc} from "firebase/firestore";
import React, {useState} from "react";
import {db} from '../../configurations/firebase';

interface SurveyProps {
    id: string;
    title: string;
    author: string;
    email: string;
    requirement: string;
    tag: string;
    date: Date;
    description: string;
    link: string;
    triggerReload: () => void;
}

export const Survey = (props: SurveyProps) => {

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
    const [editedLink, setEditedLink] = useState(props.link);

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
// Function to handle saving the edited survey
    const handleSave = async () => {
        try {
            const surveyDocRef = doc(db, "surveys", props.id);

            // Update the document fields with the edited values
            await updateDoc(surveyDocRef, {
                title: editedTitle,
                author: editedAuthor,
                email: editedEmail,
                requirement: editedRequirement,
                tag: editedTag,
                description: editedDescription,
                link: editedLink,
            });

            setIsEditing(false);
            props.triggerReload();
            console.log("Survey successfully updated!");
        } catch (error) {
            console.error("Error updating survey: ", error);
        }
    };
// Function to handle the deletion of the survey
    const handleDeletion = async () => {
        try {
            // Reference to the document in Firestore using its ID (props.id)
            const surveyDocRef = doc(db, "surveys", props.id);
            await deleteDoc(surveyDocRef); // Delete from Firebase Database
            props.triggerReload();
            console.log("Survey successfully deleted!");
            setDeleteChosen(false);
        } catch (error) {
            console.error("Error removing survey: ", error);
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
                            <th scope="row">Link</th>
                            <input
                                type="text"
                                value={editedLink}
                                onChange={(e) => setEditedLink(e.target.value)}
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
                        <p>Are you sure you want to delete this survey?</p>
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
                        <a href={props.link} target="_blank">Link to the survey</a>
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
