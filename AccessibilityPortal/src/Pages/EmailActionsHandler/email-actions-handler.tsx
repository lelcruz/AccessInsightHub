import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button} from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import {auth} from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent";
import "./EmailActionHandler.scss";

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

function closeOpenedWindow() {
    window.close();
}

function ResetPasswordPage() {
    const [new_password, setNewPassword] = useState("");
    const [confirm_newpassword, setConfirmNewPassword] = useState("");
    const [reset, setReset] = useState<boolean>(false);
    const [doneReset, setDoneReset] = useState<boolean>(false);
    const [verify, setVerify] = useState<boolean>(false);
    const [doneVerify, setDoneVerify] = useState<boolean>(false);
    const [error, setError] = useState("");

    // Navigator
    const navigate = useNavigate();
    const directToLoginPage = () => {
        navigate('/login');
    };

    // Getting the mode and oobCode from the %LINK%
    const query = useQuery();
    let mode = query.get('mode'); // MODE (resetPassword/verifyEmail/recoveryEmail)
    let oobCode = query.get('oobCode'); // OOBCODE

    // Check with mode
    useEffect(() => {
        if (mode === 'resetPassword')
            setReset(true);
        if (mode === 'verifyEmail')
            setVerify(true);
    }, []);

    return (

        <div id="resetpassword" className="reset-password-page">
            <div className="centered-container">
                {reset ?  /* Customize resetPassword Email Link Page */
                    <>
                        <label htmlFor="password" className="form-check-label">New Password</label>
                        <input type="password" placeholder="**********" value={new_password}
                               onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3"/>

                        <label htmlFor="password" className="form-check-label">Confirm New Password</label>
                        <input type="password" placeholder="**********" value={confirm_newpassword}
                               onChange={(e) => setConfirmNewPassword(e.target.value)} className="form-control mb-3"/>

                        <div style={{marginTop: "20px"}} className="text-end"></div>
                        <Button
                            color="success"
                            block
                            onClick={async e => {
                                e.preventDefault()
                                try {
                                    if (oobCode) {
                                        auth.confirmPasswordReset(oobCode, new_password)
                                            .then(userCredential => {
                                                setDoneReset(true);
                                            })
                                            .catch(error => {
                                                logging.error(error);

                                                if (error.code.includes('auth/expired-action-code')) {
                                                    setError('expired-action-code');
                                                } else if (error.code.includes('auth/invalid-action-code')) {
                                                    setError('Link has expired!!!');
                                                } else if (error.code.includes('auth/user-disabled')) {
                                                    setError('user-disabled');
                                                } else if (error.code.includes('auth/user-not-found')) {
                                                    setError('user-not-found');
                                                } else if (error.code.includes('auth/weak-password')) {
                                                    setError('weak-password');
                                                } else {
                                                    setError('Unable to register. Please try again later.')
                                                }
                                            });
                                    } else {
                                        navigate('/');
                                    }
                                } catch (error) {
                                    logging.error(error)
                                }
                            }}
                        >
                            Reset Password
                        </Button>
                        {doneReset ?
                            <div style={{marginTop: "20px"}}>
                                <BasicButtonComponent
                                    color='light' title={"Close Tab"}
                                    onClick={closeOpenedWindow}></BasicButtonComponent>
                            </div> : <>
                                <ErrorMessage error={error}/>
                            </>
                        }
                    </>
                    : verify ? /* Customize verifyEmail Email Link Page */
                        <>
                            <Button
                                color="success"
                                block
                                onClick={async e => {
                                    e.preventDefault()
                                    try {
                                        if (oobCode) {
                                            auth.applyActionCode(oobCode)
                                                .then(userCredential => {
                                                    logging.info("The account is successfully verified!")
                                                    setDoneVerify(true);
                                                })
                                                .catch(error => {
                                                    logging.error(error);
                                                });
                                        } else {
                                            navigate('/');
                                        }
                                    } catch (error) {
                                        logging.error(error)
                                    }
                                }}
                            >
                                Verify Account
                            </Button>
                            {doneVerify ?
                                <>
                                    <h1>SUCCESSFULLY RESET PASSWORD</h1>
                                    <BasicButtonComponent
                                        color='light' title={"Close Tab"}
                                        onClick={closeOpenedWindow}></BasicButtonComponent>
                                </> : <>
                                    <ErrorMessage error={error}/>
                                </>
                            }
                        </>
                        : /* Neither verifyEmail or resetPassword are called, invalid link - design later */
                        <>
                            <h1>INVALID LINK - UNAUTHORIZED USER</h1>
                            <BasicButtonComponent color='light' title={"BACK"}
                                                  onClick={directToLoginPage}></BasicButtonComponent>
                        </>
                }
            </div>
        </div>
    );
}

export default ResetPasswordPage;
