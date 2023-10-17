import React, { useState, useEffect } from "react";
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import { auth, db } from '../../configurations/firebase';
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

function RegisterWithGoogle() {

    const [modalShow, setModalShow] = useState(false);
    const [email, setEmail] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_newpassword, setConfirmNewPassword] = useState<string>("");
    const [userID, setUserID] = useState<string>("");

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert('Successfully edited!');
    }

    const createPassword = () => {

    }


    useEffect(() => {
        auth.onAuthStateChanged( async user => {
            if (user) {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // Calling for user's profile from Firestore Database
                    
                });
            }
    })}, []);

    return(
        <>
        <a href="#" onClick={openModal}>Create a Password</a>
            <Modal size="xs" isOpen={modalShow} onClose={closeModal}>
                <form className="form-box" style={{rowGap: "8px"}}>
                    
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="****************" value={new_password} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3"/>
                    
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" placeholder="****************" value={confirm_newpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="form-control mb-3"/>

                    {/* 
                    Author: Shane Luong
                    
                    */}

                    <Button color={"dark"} onClick={createPassword} title={"Save"}/>
                    <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>

                    {/*<ErrorMessage error={error}/>*/}
                </form>
            </Modal> 
        </>
    );
}
export default RegisterWithGoogle;