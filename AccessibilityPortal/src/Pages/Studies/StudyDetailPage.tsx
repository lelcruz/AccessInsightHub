import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../configurations/firebase';
import ContactModal from "../../CommonComponents/ContactUs/ContactModal";
import './StudyDetailPage.scss';
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";

interface Study {
    id: string;
    title: string;
    author: string;
    email: string;
    type: string;
    date: Date;
    description: string;
    tag: string;
    requirement: string;
}

const StudyDetailPage: React.FC = () => {
    // Extracting studyId from URL parameters
    const {studyId} = useParams<{ studyId: string }>();
    const [study, setStudy] = useState<Study | null>(null);

    const navigate = useNavigate();

    const back = () => {
        navigate('/studies')
    }
    // Effect hook to fetch study details from Firestore
    useEffect(() => {
        const fetchStudy = async () => {
            if (studyId) {
                const docRef = doc(db, "studies", studyId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    const formattedStudy = {
                        id: docSnap.id,
                        title: data.title,
                        author: data.author_name,
                        email: data.author_email,
                        type: data.type,
                        date: new Date(data.date), // Assuming 'date' is stored in an appropriate format
                        description: data.description,
                        tag: data.tag,
                        requirement: data.requirement,
                    };
                    setStudy(formattedStudy as Study);
                } else {
                    console.log("No such document!");
                }
            } else {
                // Handle the case where studyId is undefined
                console.error('studyId is undefined');
            }
        };

        fetchStudy();
    }, [studyId]);
    // Rendering the study details page
    return (
        <div className="main-page">
            <div className="study-content">
                <Button color={"light"} onClick={back} title={"Back"}/>
                <div className="text-xl-center">
                    <h1 className="fw-bold">{study?.title}</h1>
                    <h5 className="fst-italic">Author: {study?.author}</h5>
                </div>
                <div className="section">
                    <h6 className="fw-normal">Type: {study?.type}</h6>
                    <h6 className="fw-normal">Date: {study?.date ? study.date.toLocaleDateString() : 'N/A'}</h6>
                    <h6 className="fw-normal">Requirements: {study?.requirement}</h6>
                    <h6 className="fw-normal">Tag: {study?.tag}</h6>
                </div>

                <h2>Description:</h2>
                <hr/>
                <p className="lh-lg">{study?.description}</p>
                <ContactModal/>
            </div>
        </div>
    );
};

export default StudyDetailPage;
