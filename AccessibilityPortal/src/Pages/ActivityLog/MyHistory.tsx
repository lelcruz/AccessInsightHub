import React from "react";
import "../../Styles/ResearchPage.scss";
import {Survey} from "../../Pages/Survey/Survey";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from '../../configurations/firebase';

interface Survey {
    id: string,
    title: string;
    author: string;
    email: string;
    requirement: string;
    tag: string;
    date: Date;
    description: string;
    link: string;
}

// Asynchronously fetches surveys from the database
async function fetchSurveys() {
    const newSurveys: Survey[] = [];
    try {
        const q = query(collection(db, "surveys"));
        const querySnapshot = await getDocs(q);
        // Iterating through each document in the query snapshot
        querySnapshot.forEach((doc) => {
            const survey = {
                id: doc.id,
                title: doc.data().title,
                author: doc.data().author_name,
                email: doc.data().author_email,
                requirement: doc.data().requirement,
                date: new Date(doc.data().date),
                description: doc.data().description,
                link: doc.data().link,
                tag: doc.data().tag,
            };
            newSurveys.push(survey);
        });

    } catch (error) {
        console.error("Error fetching studies:", error);
    }

    return newSurveys;
}

function MyHistory() {
    // State and variables for MyHistory component (e.g., to manage pagination of surveys)
    const surveysPerPage = 3;
    // ... Rest of the MyHistory component ...
}

export default MyHistory;
