import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 

function LogoutPage() {

    const navigate = useNavigate();

    const directToMainPage = () => {
        navigate('/main');
    };

    const Logout = () => {
        auth.signOut()
        .then(result => {
            logging.info(result);
            navigate('/login');
        })
        .catch(error => logging.error(error));
    }

    return (
        <div className="logout-page">
            <p className='text-center'>Are you sure you want to logout?</p>
            <div className='text-center'> 
                <Button color="info" className="mr-2" onClick={() => Logout()}>Logout</Button>
                <BasicButtonComponent title={"Cancel"} onClick={directToMainPage}></BasicButtonComponent>
            </div>
        </div>
    );
}

export default LogoutPage;