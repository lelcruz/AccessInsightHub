import React, {useEffect, useState} from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import {Study} from "./MyStudyTemplate";
import AccessibilityMenuComponent from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import Pagination from "react-bootstrap/Pagination";
import {collection, getDocs, query, where} from "firebase/firestore";
import {auth, db} from '../../configurations/firebase';

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

async function fetchStudies() {
    const newStudies: Study[] = [];
    const user = auth.currentUser;

    if (user) {
        try {
            const q = query(collection(db, "studies"), where("author_email", "==", user.email));
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
    }

    return newStudies;
}

function MyStudies() {
    // State declarations for pagination and studies data
    const studiesPerPage = 2;
    const [activePage, setActivePage] = useState(1);
    const indexOfLastStudy = activePage * studiesPerPage;
    const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
    const [studiesInformation, setStudiesInformation] = useState<Study[]>([]);
    const [reload, setReload] = useState<boolean>(false);
    // Function to trigger a reload of the studies data
    const triggerReload = () => {
        setReload(prev => !prev); // Toggle the reload state
    };

    // useEffect to fetch studies data whenever a reload is triggered
    useEffect(() => {
        async function fetchData() {
            const newStudies = await fetchStudies();
            setStudiesInformation(newStudies);
        }

        fetchData();

        if (reload) {
            fetchData();
            setReload(false)
        }
    }, [reload]);

    const currentStudies = studiesInformation.slice(
        indexOfFirstStudy,
        indexOfLastStudy,
    );
    // Mapping each study to a UI element
    const arrayDataItems = currentStudies.map((study, index) => (
        <li key={index}>
            <Study
                id={study.id}
                title={study.title}
                author={study.author}
                email={study.email}
                requirement={study.requirement}
                tag={study.tag}
                type={study.studyType}
                date={study.date}
                description={study.description}
                triggerReload={triggerReload}
            />
        </li>
    ));

    // Calculating the total number of pages for pagination
    const totalStudies = Math.ceil(studiesInformation.length / studiesPerPage);

    const pageItems = [];
    const pageRange = 2;
    // Pagination logic
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
    // Render the list of studies and pagination
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

export default MyStudies;
