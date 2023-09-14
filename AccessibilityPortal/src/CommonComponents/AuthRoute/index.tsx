import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../../configurations/firebase';
import logging from '../../configurations/logging';

export interface IAuthRouteProps { }

const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const { children } = props as React.PropsWithChildren<IAuthRouteProps>;

    if (!auth.currentUser)
    {
        logging.warn('No user detected, redirecting');
        return <Navigate to="/" />;
    }

    return (
        <div>{children}</div> 
    );
}

export default AuthRoute;