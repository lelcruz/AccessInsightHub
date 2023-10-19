import React, { useState, useEffect } from "react";
import Modal from "../../CommonComponents/Modal Component/ModalComponent";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import { auth, db } from '../../configurations/firebase';
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";
import triggerEffect from "./ProfilePage"

interface Props {
    triggerReload: () => void;
  }

function EditModal({ triggerReload }: Props) {

    const [modalShow, setModalShow] = useState(false);
    const [role, setRole] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDob] = useState<string>("");
    const [signInWithGG, setSignInWithGG] = useState(false);
    const [newLastName, setNewLastName] = useState<string>("");
    const [newFirstName, setNewFirstName] = useState<string>("");
    const [newDob, setNewDob] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userID, setUserID] = useState<string>("");

    const openModal = () => {
        setModalShow(true);
    }

    const closeModal = () => {
        setModalShow(false);

        // Reset all the unsaved information to display the current info properly
        setNewFirstName(firstName);
        setNewLastName(lastName);
        setNewDob(dob);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert('Successfully edited!');
    }

    const editProfile = () => {
        const docRef = doc(db, "users", userID);
        const newData = {
            firstName: newFirstName,
            lastName: newLastName,
            dob: newDob,
            email: email,
            role: role,
            signInWithGoogle: signInWithGG
        };
        // Updating infos
        setDoc(docRef, newData)
        .then(() => {
            console.log("Document updated successfully!");
            triggerReload();
            setModalShow(false)
            
        })
        .catch((error) => {
            console.error("Error updating document: ", error);
        });
    }

    const fetchUser = async () => {
        const user = auth.currentUser;
        if (user && user.emailVerified) {
            try {
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // Calling for user's profile from Firestore Database
                    setFirstName(doc.data().firstName);
                    setLastName(doc.data().lastName);
                    setDob(doc.data().dob);
                    setNewFirstName(doc.data().firstName);
                    setNewLastName(doc.data().lastName);
                    setNewDob(doc.data().dob);
                    setEmail(doc.data().email);
                    setRole(doc.data().role);
                    setSignInWithGG(doc.data().signInWithGoogle)
                    setUserID(doc.id);
                });
            } catch (error) {
                
            }
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return(
        <>
        <Button color={"light"} onClick={openModal} title={"Edit Account"}/>

        <Modal size="xs" isOpen={modalShow} onClose={closeModal}>
            <form className="form-box" style={{rowGap: "8px"}} onSubmit={handleSubmit}>
              
                <label htmlFor='firstName'>First Name</label>
                <input type="text" className="full-length-item" value={newFirstName} onChange={(e) => {setNewFirstName(e.target.value)}}></input>
                <label htmlFor='lastName'>Last Name</label>
                <input type="text" className="full-length-item" value={newLastName} onChange={(e) => setNewLastName(e.target.value)}></input> 
                <label htmlFor='DOB'>Date of Birth</label>
                <input type="date" className="full-length-item" value={newDob} min="1900-01-01" max="2023-01-01" onChange={(e) => setNewDob(e.target.value)}></input>
        
                <Button color={"dark"} onClick={editProfile} title={"Save"}/>
                <Button color={"dark"} onClick={closeModal} title={"Cancel"}/>
                
          </form>
        </Modal>
        </> 
    );
}
export default EditModal