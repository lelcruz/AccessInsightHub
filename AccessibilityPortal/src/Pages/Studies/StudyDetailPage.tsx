import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {doc, getDoc} from 'firebase/firestore';
import {db} from '../../configurations/firebase';
import ContactModal from "../../CommonComponents/ContactUs/ContactModal";
import './StudyDetailPage.scss';

interface Study {
    id: string;
    title: string;
    author: string;
    email: string;
    type: string;
    date: Date;
    description: string;
}

const StudyDetailPage: React.FC = () => {
    const {studyId} = useParams<{ studyId: string }>();
    const [study, setStudy] = useState<Study | null>(null);

    useEffect(() => {
        const fetchStudy = async () => {
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
                    description: data.description
                };
                setStudy(formattedStudy as Study);
            } else {
                console.log("No such document!");
            }
        };

        fetchStudy();
    }, [studyId]);

    return (
        <div className="study-content">
            <div className="text-xl-center">
                <h1 className="fw-bold">{study?.title}</h1>
                <h5 className="fst-italic">Author: {study?.author}</h5>
            </div>
            {/*<h5>{study?.email}</h5>*/}
            <div className="section">
                <h6 className="fw-normal">Type: {study?.type}</h6>
                <h6 className="fw-normal">Date: {study?.date ? study.date.toLocaleDateString() : 'N/A'}</h6>
                <h6 className="fw-normal">Requirements: </h6>
            </div>

            <h2>Description:</h2>
            <hr/>
            <p className="lh-lg">{study?.description}</p>
            <ContactModal/>
        </div>
    );
};

export default StudyDetailPage;
