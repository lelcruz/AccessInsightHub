import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../config/firebase';
import logging from '../../config/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/registration.scss'

function ChangePassword() {
    
    const [change_password, setChangePassword] = useState<boolean>(false);
    const [old_password, setOldPassword] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_newpassword, setConfirmNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const directToMain = () => {
        navigate('/main');
    };

    const changePassword = () => {
        if (error !== '') setError('');

        setChangePassword(true);

        auth.currentUser?.updatePassword(new_password)
        .then(() => {
            logging.info("Password is changed successfully");
            navigate('/main');
        })
        .catch(error => {
            logging.error(error);
            setChangePassword(false);
            setError(error.message);
        });
    }

    return (
        <div id="changepassword" className="changepassword-page">
                <div className="text-center">
                    <h2>Change your password</h2>
                </div>

            <div className="changepassword-body">
                <label htmlFor="password" className="form-check-label">Current Password</label>
                <input type="password" placeholder="**********" value={old_password} onChange={(e) => setOldPassword(e.target.value)} className="form-control mb-3"/>
                
                <label htmlFor="password" className="form-check-label">New Password</label>
                <input type="password" placeholder="**********" value={new_password} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3"/>
                
                <label htmlFor="password" className="form-check-label">Confirm New Password</label>
                <input type="password" placeholder="**********" value={confirm_newpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="form-control mb-3"/>
                
                <div style={{marginTop: "20px"}} className="text-end">
                    <Button
                        disabled={change_password}
                        color="success"
                        block
                        onClick={() => changePassword()}
                    >Change password</Button>
                    
                    <span className="btn-right-space"></span>
                    <BasicButtonComponent title={"Cancel"} onClick={directToMain}></BasicButtonComponent>
                </div>

                <ErrorMessage error={error}/>
            </div>  
        </div>
    );
}

export default ChangePassword;