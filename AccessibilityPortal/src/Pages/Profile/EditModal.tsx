import React, {useState} from "react";
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";

function EditModal() {

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
        <Button color={"light"} onClick={openModal} title={"Edit Account"}/>

        <Modal size="m" isOpen={modalShow} onClose={closeModal}>
                <form className="form-box" style={{rowGap: "8px"}} onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type="text" className="full-length-item"></input> {/* display current info */}
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" className="full-length-item"></input> {/* display current info */}
                    <label htmlFor='DOB'>Date of Birth</label>
                    <input type="date" className="full-length-item"></input> {/* display current info */}
                    <label htmlFor='emailAddress'>Email Address</label>
                    <input type="email" className="full-length-item"></input> {/* display current info */}
                    <label htmlFor='newPass'>New Password</label>
                    <input type="password" className="full-length-item"></input> {/* exclude */}
                    <label htmlFor='confirmPass'>Confirm Password</label>
                    <input type="password" className="full-length-item"></input> {/* exclude */}
            
                    <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>
                    <Button color={"dark"} type="submit" title={"Save"}/>
                 </form>
        </Modal>
        </> 
    );


}
export default EditModal