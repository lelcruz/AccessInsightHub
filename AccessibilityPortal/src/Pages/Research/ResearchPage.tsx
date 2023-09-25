import React from "react";
import "../../Styles/ResearchPage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import ContactModal from "./ContactModal";

function ResearchPage() {
  return (
    <div className="ResearchPageBody">
      <NavbarComponent />
      <ContactModal />
    </div>
  );
}

export default ResearchPage;
