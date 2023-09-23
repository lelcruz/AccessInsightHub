import React from 'react';
import './ContactModal.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ContactModal(props: any) {

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert('Saved');
    }

    return(
        <>
        <Modal
        {...props}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Have any Question? <br/> Get in touch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body >
          <form className="form-box" onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name"></input>
            <input type="text" placeholder="Last Name"></input>
            <input type="email" className="full-length-item" placeholder="Email"></input>
            <textarea className="full-length-item text-box" placeholder="Description"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
          <Button onClick={props.onHide} type="submit" value="Submit">Save</Button>
        </Modal.Footer>
      </Modal>

      </>
    )
 
}
export default ContactModal;