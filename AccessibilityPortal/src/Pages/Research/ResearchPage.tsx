import React, {useState} from 'react';
import '../../Styles/ResearchPage.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import StudyForm from "./StudyForm";
import ContactModal from "../../CommonComponents/ContactModal/ContactModal";
import Button from 'react-bootstrap/Button';


function ResearchPage(){
    const [modalShow, setModalShow] = useState(false);

    return (
        <>
        <div className="ResearchPageBody">
            <NavbarComponent/>
            <StudyForm> <Button variant="primary" onClick={() => setModalShow(true)}>
                Contact
            </Button>

            <ContactModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            />
            <StudyForm/>

            
        
        </div>


        </>

    );

}

export default ResearchPage;