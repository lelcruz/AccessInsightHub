import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import { useNavigate } from 'react-router-dom';
import "./ForgotPasswordPage.scss";

function ForgotPasswordPage() {

    const [sending, setSending] = useState<boolean>(false);
    const [sent, setSent] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string>('');

    const navigate = useNavigate();

    const directToLoginPage = () => {
        navigate('/login');
    };

    const back = () => {
        setSent(false);  
        setEmail('')
    };

    const resetPasswordRequest = () => {
        if (error !== '') setError('');

        setSending(true);

        auth.sendPasswordResetEmail(email)
        .then(() => {
            logging.info('Sent!!!');
            setSent(true);
            setSending(false);
        })
        .catch(error => {
            logging.error(error);
            setError(error.message);
            setSending(false);
        });

        window.close();
    }

    return (
        <div className="main-page">
            <div className="form-component">
                {sent ?
                    <div className="confirmation">
                    <p>The recovery email has been sent to the entered email with instructions. Please check your mailbox.</p>
                    <div className="action-button">
                        <BasicButtonComponent color='light' title={"Go back"} onClick={directToLoginPage}></BasicButtonComponent>
                        <BasicButtonComponent color='light' title={"Resend"} onClick={back}></BasicButtonComponent>
                    </div>
                    </div>
                :
                    <>
                        <h5>Please enter your email address</h5>
                        <label htmlFor="username" className="form-check-label"> Email Address </label>
                        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control mb-3"/>

                        <Button
                            disabled={sending}
                            color="success"
                            block
                            onClick={() => resetPasswordRequest()}
                        >
                            Send Reset Link
                        </Button>
                        <ErrorMessage error={error} />
                    </>
                }
            </div>
        </div>
    );
}

export default ForgotPasswordPage;