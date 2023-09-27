import React, { useState } from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import { Study } from "./Study";
import AccessibilityMenuComponent from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";
import Pagination from "react-bootstrap/Pagination";

function StudiesPage() {
  const studiesInformation = [
    {
      id: 1,
      title: "Studies title 1",
      author: "Author Name 1",
      studyType: "N/A",
      date: new Date("01/03/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 2,
      title: "Studies title 2",
      author: "Author Name 2",
      studyType: "N/A",
      date: new Date("01/09/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "Studies title 3",
      author: "Author Name 3",
      studyType: "N/A",
      date: new Date("01/28/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 1,
      title: "Studies title 1",
      author: "Author Name 1",
      studyType: "N/A",
      date: new Date("01/03/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 2,
      title: "Studies title 2",
      author: "Author Name 2",
      studyType: "N/A",
      date: new Date("01/09/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 3,
      title: "Studies title 3",
      author: "Author Name 3",
      studyType: "N/A",
      date: new Date("01/28/2023"),
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ];
  const studiesPerPage = 1;
  const [activePage, setActivePage] = useState(1);
  const indexOfLastStudy = activePage * studiesPerPage;
  const indexOfFirstStudy = indexOfLastStudy - studiesPerPage;
  const currentStudies = studiesInformation.slice(
    indexOfFirstStudy,
    indexOfLastStudy,
  );

  const arrayDataItems = currentStudies.map((study) => (
    <li key={study.id}>
      <Study
        title={study.title}
        author={study.author}
        type={study.studyType}
        date={study.date}
        description={study.description}
      />
    </li>
  ));

  const totalStudies = Math.ceil(studiesInformation.length / studiesPerPage);

  const pageItems = [];
  const pageRange = 2;

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
      <AccessibilityMenuComponent />
    </div>
  );
}

export default StudiesPage;
