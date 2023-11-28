import React, {useState} from "react";
import BasicButtonComponent from "../Buttons/BasicButtonComponent";
import Modal from "../Modal Component/ModalComponent";
import {addDoc, collection} from "firebase/firestore";
import { db } from "../../configurations/firebase";

function ContactModal() {
    const [modalShow, setModalShow] = useState(false);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
    };

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        const docRef = addDoc(collection(db,"contactForm"), {
            firstname: firstName,
            lastname: lastName,
            email: email,
            message: message
        });

        e.preventDefault();
        alert("Sent")
        closeModal();
    }

    return (
        <div>
            <BasicButtonComponent
                color={"light"}
                title="Contact Us"
                onClick={openModal}
            />
            <Modal size="s" isOpen={modalShow} onClose={closeModal}>
                <h4>Have any Question?</h4>
                <h4>Get in touch</h4>
                <form className="form-box" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="single-item"
                        placeholder="First Name"
                        onChange={(e) => {setFirstName(e.target.value)}}
                    ></input>
                    <input
                        type="text"
                        className="single-item"
                        placeholder="Last Name"
                        onChange={(e) => {setLastName(e.target.value)}}
                    ></input>
                    <input
                        type="email"
                        className="full-length-item"
                        placeholder="Email"
                        onChange={(e) => {setEmail(e.target.value)}}
                    ></input>
                    <textarea
                        className="full-length-item text-box"
                        placeholder="Description"
                        onChange={(e) => {setMessage(e.target.value)}}
                    ></textarea>
                    <BasicButtonComponent
                        color={"dark"}
                        title="Cancel"
                        onClick={closeModal}
                    />
                    <BasicButtonComponent color={"dark"} type="submit" title="Save"/>
                </form>
            </Modal>
        </div>
    );
}

export default ContactModal;
