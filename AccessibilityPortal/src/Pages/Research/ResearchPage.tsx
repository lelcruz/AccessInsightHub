import React, {useState} from 'react';
import '../../Styles/ResearchPage.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import BasicButtonComponent from '../../CommonComponents/Buttons/BasicButtonComponent';


function ResearchPage(){

    const [modalShow, setModalShow] = useState(false);

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert('Saved');
    }

    return (
        
        <div className="ResearchPageBody">
            <NavbarComponent/>

            <BasicButtonComponent color={"light"} title="Open Modal" onClick={openModal}/>
            <Modal size="s" isOpen={modalShow} onClose={closeModal}>
                <h4>Have any Question?</h4>
                <h4>Get in touch</h4>
                <form className="form-box" onSubmit={handleSubmit}>
                    <input type="text" className="single-item" placeholder="First Name"></input>
                    <input type="text" className="single-item" placeholder="Last Name"></input>
                    <input type="email" className="full-length-item" placeholder="Email"></input>
                    <textarea className="full-length-item text-box" placeholder="Description"></textarea>
                    <BasicButtonComponent color={"dark"} title="Cancel" onClick={closeModal} />
                    <BasicButtonComponent color={"dark"} type="submit" title="Save" />
                </form>
             </Modal>
             
        </div>
      
        



    );

}

export default ResearchPage;
