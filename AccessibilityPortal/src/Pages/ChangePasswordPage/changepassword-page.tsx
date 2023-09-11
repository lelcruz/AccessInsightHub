import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import '../../Styles/registration.scss';
import {useNavigate} from "react-router-dom";

function ChangePassword() {
    
    const navigate = useNavigate();

    const directToMainPage = () => {
        navigate('/main');
    };

    const [change_password, setChangePassword] = useState<boolean>(false);
    const [old_password, setOldPassword] = useState<string>("");
    const [new_password, setNewPassword] = useState<string>("");
    const [confirm_newpassword, setConfirmNewPassword] = useState<string>("");
    const [error, setError] = useState<string>("");

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
            alert("All fields are required!");
            return false;
        }

        // Verify OLD PASSWORD
        if (auth.currentUser?.providerData[0]?.providerId !== 'old_password') {
            alert("The current password is incorrect!");
            return false;
        }

        // Match password-regex
        if(!passwordRegex.test(new_password)) {
            alert("Password should contain at least 8 characters, at least 1 UPPERCASE, 1 lowercase, 1 number, and a special character");
            return false;
        }

        // Confirm Password
        if(!new_password.match(confirm_newpassword)) {
            alert("Passwords do not match!");
            return false;
        }

        return true;
    }

    const changePassword = () => {
        if (!Validation())
            return;

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
                    <BasicButtonComponent title={"Cancel"} onClick={directToMainPage}></BasicButtonComponent>
                </div>

                <ErrorMessage error={error}/>
            </div>  
        </div>
    );
}

export default ChangePassword;