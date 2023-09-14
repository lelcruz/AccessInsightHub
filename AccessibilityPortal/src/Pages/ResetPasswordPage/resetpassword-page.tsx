import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, FormGroup, Input, Spinner } from 'reactstrap';
import ErrorMessage from '../../CommonComponents/ErrorMessage';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';

const ResetPasswordPage: React.FunctionComponent<any> = () => {
    const [verifying, setVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [change_password, setChangePassword] = useState(false);
    const [new_password, setNewPassword] = useState("");
    const [confirm_newpassword, setConfirmNewPassword] = useState("");
    const [oobCode, setOobCode] = useState<string>("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const params = useParams<{ oobCode: string }>();
    console.log(params);
    
    useEffect(() => {
        logging.info('Extracting code');

        if (params.oobCode) {
            logging.info('Code found');
            verifyPasswordResetLink(params.oobCode);
        } else {
            logging.error('Unable to find code');
            setVerified(false);
            setVerifying(false);
        }
        // eslint-disable-next-line
    }, [params.oobCode]);

    const verifyPasswordResetLink = (_code: string) => {
        auth.verifyPasswordResetCode(_code)
        .then(result => {
            logging.info(result);
            setOobCode(_code);
            setVerified(true);
            setVerifying(false);
        })
        .catch(error => {
            logging.error(error);
            setVerified(false);
            setVerifying(false);
        });
    }

    const passwordResetRequest = () => {
        if (new_password !== confirm_newpassword) {
            setError('Make sure your passwords are matching');
            return;
        }

        if (error !== '') setError('');

        setChangePassword(true);

        if (oobCode) {
            auth.confirmPasswordReset(oobCode, new_password)
                .then(() => {
                    navigate('./login');
                })
                .catch(error => {
                    logging.error(error);
                    setError(error.message);
                    setChangePassword(false);
                });
        } else {
            setError('Invalid reset code');
            setChangePassword(false);
        }
    }

    return (
        <div id="resetpassword" className="resetpassword-page">
            {verifying ?
                <Spinner color="info" />
            :
                <>
                    {verified ?
                        <>
                            <label htmlFor="password" className="form-check-label">New Password</label>
                            <input type="password" placeholder="**********" value={new_password} onChange={(e) => setNewPassword(e.target.value)} className="form-control mb-3"/>
                            
                            <label htmlFor="password" className="form-check-label">Confirm New Password</label>
                            <input type="password" placeholder="**********" value={confirm_newpassword} onChange={(e) => setConfirmNewPassword(e.target.value)} className="form-control mb-3"/>
                            
                            <div style={{marginTop: "20px"}} className="text-end"></div>
                            <Button
                                disabled={change_password}
                                color="success"
                                block
                                onClick={() => passwordResetRequest()}
                            >
                                Reset Password
                            </Button>

                            <ErrorMessage error={error} />
                        </>
                    :
                        <p>--------------Invalid link--------------</p>
                    }
                </>
            }
        </div>
    );
}

export default ResetPasswordPage;
