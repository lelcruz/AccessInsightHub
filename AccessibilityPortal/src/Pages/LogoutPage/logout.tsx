import React, {useEffect, useState} from 'react';
import Modal from "../../CommonComponents/Modal Component/LogOutPopUp";
import Button from "../../CommonComponents/Buttons/BasicButtonComponent";
import {useNavigate} from 'react-router-dom';
import {auth} from '../../configurations/firebase';
import logging from '../../configurations/logging';

interface LogoutProps {
    opened?: boolean;
}

//Component for handling user logout.
function Logout(props: LogoutProps) {
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const navigate = useNavigate();

    //Handles the logout process.
    // Signs out the user using Firebase authentication and navigates to the login page.

    const logout = () => {
        auth.signOut()
            .then(result => {
                logging.info(result);
                navigate('/login');
            })
            .catch(error => logging.error(error));
    }
    // Effect hook to open modal based on external props
    useEffect(() => {
        // Set isOPen to be true if props.opened is true
        if (props.opened) {
            setIsOpen(true);
        }
    }, [props.opened]);
    // Rendering the component with conditional modal display
    return (
        <>
            {props.opened
                ? <>

                    <Modal size='m' isOpen={isOpen} onClose={closeModal}>

                        <Button color={"dark"} onClick={logout} title={"Logout"}/>
                        <Button color={"light"} onClick={closeModal} title={"Cancel"}/>

                    </Modal>
                </>
                : <>
                    <Button color={"light"} onClick={openModal} title={"Logout"}/>
                    <Modal size='m' isOpen={isOpen} onClose={closeModal}>

                        <Button color={"dark"} onClick={logout} title={"Logout"}/>
                        <Button color={"light"} onClick={closeModal} title={"Cancel"}/>

                    </Modal>
                </>
            }
        </>
    );
}

export default Logout;
