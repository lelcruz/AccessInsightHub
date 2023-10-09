import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';
import BasicButtonComponent from "../../CommonComponents/Buttons/BasicButtonComponent"; 
import { useNavigate } from 'react-router-dom';

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
    }

    return (
        <div className="forgotpassword-page">
            {sent ?
                <div>
                <p>The recovery email has been sent to the entered email with instructions. Please check your mailbox.</p>
                <BasicButtonComponent title={"Go back"} onClick={directToLoginPage}></BasicButtonComponent>
                <BasicButtonComponent title={"Resend"} onClick={back}></BasicButtonComponent>
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
    );
}

export default ForgotPasswordPage;