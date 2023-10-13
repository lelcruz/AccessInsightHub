import React, { useState } from 'react';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import '../../Styles/registration.scss';
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import { getAuth, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

function PasswordModal() {

    const [modalShow, setModalShow] = useState(false);
    const [old_password, setOldPassword] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_newpassword, setConfirmNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert('Successully changed password!');
    }

    // Text-fields are required
    function isItEmpty(str: any) {
        return str == null || str.match(/^ *$/) !== null;
    }

    // Validation
    function Validation() {
        //let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        let passwordRegex = /.*/; // simple one

        // All fields are required
        if(isItEmpty(old_password) || isItEmpty(new_password) || isItEmpty(confirm_newpassword)){
            logging.error("All fields are required!");
            //setError("All fields are required!");
            return false;
        }

        // Verify OLD PASSWORD
        const credential = EmailAuthProvider.credential(
            auth.currentUser?.email || '', 
            old_password
        );

        auth.currentUser?.reauthenticateWithCredential(credential)
            .then(() => {
                //console.log('Current password is reauthenticated successfully!');
            })
            .catch((error) => {
                logging.error("The current password is incorrect!");
                //setError("The current password is incorrect!");
                return false;
            });

        // Match password-regex
        if(!passwordRegex.test(new_password)) {
            logging.error("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            //setError("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            return false;
        }

        // Confirm Password
        if(!new_password.match(confirm_newpassword)) {
            logging.error("Passwords do not match!");
            //setError("Passwords do not match!");
            return false;
        }

        return true;
    }

    const changePassword = () => {
        if (!Validation()) {
            logging.info("Validation error!");
            return;
        }

        if (error !== '') setError('');

        auth.currentUser?.updatePassword(new_password)
        .then(() => {
            logging.info("Password is changed successfully");
            setModalShow(false);
        })
        .catch(error => {
            logging.error(error);
            setError(error.message);
        });
    }

    return(
        <>
        <a href="#" onClick={openModal}>Change Password</a>
            <Modal size="xs" isOpen={modalShow} onClose={closeModal}>
                <form className="form-box" style={{rowGap: "8px"}}>
                    <label htmlFor="password">Current Password</label>
                    <input type="password" placeholder="****************" value={old_password} onChange={(e) => setOldPassword(e.target.value)} className="form-control mb-3"/>
                    
                    <label htmlFor="password">New Password</label>
                    <input type="password" placeholder="****************" value={new_password} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3"/>
                    
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="****************" value={confirm_newpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="form-control mb-3"/>

                    {/* 
                    Author: Shane Luong
                    -> First time hitting SAVE will force the page to reload (ISSUE), the cause not yet found. Fix later
                    */}

                    <Button color={"dark"} onClick={changePassword} title={"Save"}/>
                    <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>

                    {/*<ErrorMessage error={error}/>*/}
                </form>
            </Modal> 
        </>
    );

}
export default PasswordModal