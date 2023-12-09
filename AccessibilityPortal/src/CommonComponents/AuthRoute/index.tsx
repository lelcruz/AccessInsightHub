import React from 'react';
import {Navigate} from 'react-router-dom';
import {auth} from '../../configurations/firebase';
import logging from '../../configurations/logging';

export interface IAuthRouteProps {
}

/**
 * AuthRoute is a React component that renders child components if a user is authenticated,
 * or redirects to the homepage if no user is authenticated.
 * It utilizes the current user state from Firebase authentication to determine user status.
 */
const AuthRoute: React.FunctionComponent<IAuthRouteProps> = props => {
    const {children} = props as React.PropsWithChildren<IAuthRouteProps>;

    // Check for user authentication. Redirect to home page if no user is found.
    if (!auth.currentUser) {
        logging.warn('No user detected, redirecting');
        return <Navigate to="/"/>;
    }

    // Render child components if a user is authenticated
    return <div>{children}</div>;
}

export default AuthRoute;
