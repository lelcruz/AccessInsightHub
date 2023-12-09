import React, {useState} from 'react';
import Modal from "../../CommonComponents/Modal Component/LogOutPopUp";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";

function ContactUsModal() {
    // State to control the visibility of the modal
    const [modalShow, setModalShow] = useState(false);

    // Function to open the modal
    const openModal = () => setModalShow(true);

    // Function to close the modal
    const closeModal = () => setModalShow(false);

    // Function to handle form submission
    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Saved"); // Placeholder action for form submission
    }

    // Placeholder function for additional contact logic
    const contactUs = () => {
        // Implement contact logic here
    }

    // Rendering the modal with form elements
    return (
        <>
            <Modal size="s" isOpen={modalShow} onClose={closeModal}>
                <h4>Have any Question?</h4>
                <h4>Get in touch</h4>
                <form className="form-box" onSubmit={handleSubmit}>
                    {/* Input fields for the contact form */}
                    <input type="text" className="single-item" placeholder="First Name"/>
                    <input type="text" className="single-item" placeholder="Last Name"/>
                    <input type="email" className="full-length-item" placeholder="Email"/>
                    <textarea className="full-length-item text-box" placeholder="Description"/>

                    {/* Buttons for submitting the form and closing the modal */}
                    <Button color={"dark"} onClick={contactUs} title={"Contact Us"}/>
                    <Button color={"light"} onClick={closeModal} title={"Cancel"}/>
                </form>
            </Modal>
        </>
    );
}

export default ContactUsModal;

