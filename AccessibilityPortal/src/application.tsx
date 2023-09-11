import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import AuthRoute from '../src/CommonComponents/AuthRoute';
import { auth } from './configurations/firebase';
import logging from './configurations/logging';
import routes from './configurations/routes';

export interface IApplicationProps { }

const Application: React.FunctionComponent<IApplicationProps> = props => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user)
            {
                logging.info('User detected.');
            }
            else
            {
                logging.info('No user detected');
            }

            setLoading(false);
        })
    }, []);

    if (loading)
        return <Spinner color="info" />

    return (
        <div>
            {routes.map((route, index) => 
                <Route
                    key={index}
                    path={route.path} 
                    Component={(routeProps: any) => {
                        if (route.protected)
                        return <AuthRoute><route.component  {...routeProps} /></AuthRoute>;

                    return <route.component  {...routeProps} />;
                    }}
                />
                )}
        </div>
    );
}

export default Application;