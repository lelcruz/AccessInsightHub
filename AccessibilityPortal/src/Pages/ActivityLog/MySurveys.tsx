import React, { useEffect, useState } from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import AccessibilityMenuComponent from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import Pagination from "react-bootstrap/Pagination";
import { Survey } from "./MySurveyTemplate";
import { addDoc, collection, doc, getDocs, query, where, updateDoc, deleteDoc } from "firebase/firestore";
import {auth, db} from '../../configurations/firebase';

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

async function fetchSurveys() {
    const newSurveys: Survey[] = [];
    const user = auth.currentUser;

    if(user) {
        try {
            const q = query(collection(db, "surveys"), where("author_email", "==", user.email)); 
            const querySnapshot = await getDocs(q);

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
    }

    return newSurveys;
}

function MySurveys() {
  
  const surveysPerPage = 2;
  const [activePage, setActivePage] = useState(1);
  const indexOfLastSurvey = activePage * surveysPerPage;
  const indexOfFirstSurvey = indexOfLastSurvey - surveysPerPage;
  const [surveysInformation, setSurveysInformation] = useState<Survey[]>([]);
  const currentSurveys = surveysInformation.slice(
    indexOfFirstSurvey,
    indexOfLastSurvey,
  );

  const [reload, setReload] = useState<boolean>(false);

  const triggerReload = () => {
      setReload(prev => !prev); // Toggle the reload state
  };

  useEffect(() => {
    async function fetchData() {
        const newSurveys = await fetchSurveys();
        setSurveysInformation(newSurveys);
    }
    fetchData();

    if(reload) {
      fetchData();
      setReload(false)
    }
}, [reload]);

  const arrayDataItems = currentSurveys.map((survey) => (
    <li key={survey.id}>
      <Survey
        id={survey.id}
        title={survey.title}
        author={survey.author}
        email={survey.email}
        requirement={survey.requirement}
        date={survey.date}
        description={survey.description}
        link={survey.link}
        tag={survey.tag}
        triggerReload={triggerReload}
      />
    </li>
  ));

  const totalSurveys = Math.ceil(surveysInformation.length / surveysPerPage);

  const pageItems = [];
  const pageRange = 2;

  for (
    let number = Math.max(1, activePage - pageRange);
    number <= Math.min(totalSurveys, activePage + pageRange);
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

  return (
    <div className="ResearchPageBody">
      <NavbarComponent />
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
        {activePage + pageRange < totalSurveys && (
          <>
            {activePage + pageRange < totalSurveys - 1 && (
              <Pagination.Item disabled>...</Pagination.Item>
            )}
            <Pagination.Item onClick={() => setActivePage(totalSurveys)}>
              {totalSurveys}
            </Pagination.Item>
          </>
        )}
        <Pagination.Next
          onClick={() => setActivePage(activePage + 1)}
          disabled={activePage === totalSurveys}
        >
          Next
        </Pagination.Next>
      </Pagination>
      <AccessibilityMenuComponent />
    </div>
  );
}

export default MySurveys;
