import React from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import { Study } from "./Study";
import AccessibilityMenuComponent from "../../CommonComponents/AccessibilityMenu/AccessibilityMenuComponent";

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
  ];

  const arrayDataItems = studiesInformation.map((study) => (
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

  return (
    <div className="ResearchPageBody">
      <NavbarComponent />
      <ul>{arrayDataItems}</ul>
      {/*<ContactModal />*/}
      <AccessibilityMenuComponent />
    </div>
  );
}

export default StudiesPage;
