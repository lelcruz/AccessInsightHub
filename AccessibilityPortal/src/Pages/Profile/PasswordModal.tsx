import React, {useState} from "react";
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";

function PasswordModal() {

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

    return(
        <>
        <a href="#" onClick={openModal}>Change Password</a>
            <Modal size="xs" isOpen={modalShow} onClose={closeModal}>
                <form className="form-box" style={{rowGap: "8px"}} onSubmit={handleSubmit}>
                    <label htmlFor='currentPassword'>Current Password</label>
                    <input type="text" className="full-length-item"></input>
                    <label htmlFor='newPassword'>New Password</label>
                    <input type="text" className="full-length-item"></input>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input type="text" className="full-length-item"></input>
            
                    <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>
                    <Button color={"dark"} type="submit" title={"Save"}/>
                </form>
            </Modal> 
        </>
    );

}
export default PasswordModal