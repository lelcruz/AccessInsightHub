import React, {useState} from 'react';
import '../../Styles/ProfilePage.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import EditModal from "../../CommonComponents/Modal Component/ModalComponent";


function ProfilePage(){

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
        <div className="main-page">
            <NavbarComponent/>

            <Button color={"light"} onClick={openModal} title={"Edit Account"}/>

            <EditModal size="m" isOpen={modalShow} onClose={closeModal}>
                <form className="form-box" style={{rowGap: "8px"}} onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input type="text" className="full-length-item"></input>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" className="full-length-item"></input>
                    <label htmlFor='DOB'>Date of Birth</label>
                    <input type="date" className="full-length-item"></input>
                    <label htmlFor='emailAddress'>Email Address</label>
                    <input type="email" className="full-length-item"></input>
                    <label htmlFor='newPass'>New Password</label>
                    <input type="password" className="full-length-item"></input>
                    <label htmlFor='confirmPass'>Confirm Password</label>
                    <input type="password" className="full-length-item"></input>
            
                    <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>
                    <Button color={"dark"} type="submit" title={"Save"}/>
                 </form>
            </EditModal>




        </div>




    );

}

export default ProfilePage;