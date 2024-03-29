import React, {useEffect, useState} from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import {Study} from "./Study";
import AccessibilityMenuComponent from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import Pagination from "react-bootstrap/Pagination";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from '../../configurations/firebase';
import {Link} from 'react-router-dom';

interface Study {
    id: string,
    title: string;
    author: string;
    email: string;
    studyType: string;
    date: Date;
    description: string;
    tag: string;
    requirement: string;
}

//Asynchronously fetches studies from the Firestore database.
async function fetchStudies() {
    const newStudies: Study[] = [];
    try {
        const q = query(collection(db, "studies"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const study = {
                id: doc.id,
                title: doc.data().title,
                author: doc.data().author_name,
                email: doc.data().author_email,
                studyType: doc.data().type,
                date: new Date(doc.data().date),
                description: doc.data().description,
                tag: doc.data().tag,
                requirement: doc.data().requirement,
            };
            newStudies.push(study);
        });

    } catch (error) {
        console.error("Error fetching studies:", error);
    }

    return newStudies;
}

function StudiesPage() {

    const studiesPerPage = 2;
    const [activePage, setActivePage] = useState(1);
    const indexOfLastStudy = activePage * studiesPerPage;
    const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
    const [studiesInformation, setStudiesInformation] = useState<Study[]>([]);
    // Effect hook to fetch studies data on component mount
    useEffect(() => {
        async function fetchData() {
            const newStudies = await fetchStudies();
            setStudiesInformation(newStudies);
        }

        fetchData();
    }, []);

    const currentStudies = studiesInformation.slice(
        indexOfFirstStudy,
        indexOfLastStudy,
    );
    // Mapping each study to a renderable element
    const arrayDataItems = currentStudies.map((study, index) => (
        <li key={index}>
            <Study
                author={study.author}
                email={study.email}
                requirement={study.requirement}
                tag={study.tag}
                type={study.studyType}
                date={study.date}
                description={study.description}
                titleElement={
                    <Link to={`/study/${study.id}`}>{study.title}</Link> // The title as a clickable link
                }
            />
        </li>
    ));


    const totalStudies = Math.ceil(studiesInformation.length / studiesPerPage);

    const pageItems = [];
    const pageRange = 2;
    // Loop to create pagination items
    for (
        let number = Math.max(1, activePage - pageRange);
        number <= Math.min(totalStudies, activePage + pageRange);
        number++
    ) {
        pageItems.push(
            <Pagination.Item
                key={number}
                active={number === activePage}
                onClick={() => setActivePage(number)}
            >
                {number}
            </Pagination.Item>,
        );
    }
    // Rendering the studies page with pagination
    return (
        <div className="ResearchPageBody">
            <NavbarComponent/>
            <ul>{arrayDataItems}</ul>
            <Pagination className=" pagination justify-content-center">
                <Pagination.Prev
                    onClick={() => setActivePage(activePage - 1)}
                    disabled={activePage === 1}
                >
                    Previous
                </Pagination.Prev>
                {activePage - pageRange > 1 && (
                    <>
                        <Pagination.Item onClick={() => setActivePage(1)}>
                            1
                        </Pagination.Item>
                        {activePage - pageRange > 2 && (
                            <Pagination.Item disabled>...</Pagination.Item>
                        )}
                    </>
                )}
                {pageItems}
                {activePage + pageRange < totalStudies && (
                    <>
                        {activePage + pageRange < totalStudies - 1 && (
                            <Pagination.Item disabled>...</Pagination.Item>
                        )}
                        <Pagination.Item onClick={() => setActivePage(totalStudies)}>
                            {totalStudies}
                        </Pagination.Item>
                    </>
                )}
                <Pagination.Next
                    onClick={() => setActivePage(activePage + 1)}
                    disabled={activePage === totalStudies}
                >
                    Next
                </Pagination.Next>
            </Pagination>
            <AccessibilityMenuComponent/>
        </div>
    );
}

export default StudiesPage;
