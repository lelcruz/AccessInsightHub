import React, { useState } from 'react';
import Modal from "../../CommonComponents/Modal Component/LogOutPopUp";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import { useNavigate } from 'react-router-dom';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";

function ContactUsModal() {
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    alert("Saved");
  }

  const contactUs = () => {
    

  }

  return (
    <>
      <Modal size="s" isOpen={modalShow} onClose={closeModal}>
        <h4>Have any Question?</h4>
        <h4>Get in touch</h4>
        <form className="form-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="single-item"
            placeholder="First Name"
          ></input>
          <input
            type="text"
            className="single-item"
            placeholder="Last Name"
          ></input>
          <input
            type="email"
            className="full-length-item"
            placeholder="Email"
          ></input>
          <textarea
            className="full-length-item text-box"
            placeholder="Description"
          ></textarea>

          <Button color={"dark"} onClick={contactUs} title={"ContactUs"}/>
          <Button color={"light"} onClick={closeModal} title={"Cancel"}/>
        </form>
      </Modal>
    </>
  );
}

export default ContactUsModal;
