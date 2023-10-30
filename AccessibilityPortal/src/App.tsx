import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './Styles/App.scss'
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import AuthRoute from '../src/CommonComponents/AuthRoute';
import { auth } from './configurations/firebase';
import logging from './configurations/logging';
import routes from './configurations/routes';

function App() {

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      auth.onAuthStateChanged(user => {
        if (user)
        {
            logging.info('App.tsx: User detected.' + user.email);
            if (window.location.pathname === '/login') {
                auth.signOut()
                  .then(() => {
                    logging.info('App.tsx: User logged out due to errors');
                  })
                  .catch(error => logging.error(error));
              }
        }
        else
        {
           logging.info('App.tsx: No user detected');
        }

        setLoading(false);
      })
  }, []);

  if (loading)
      return <Spinner color="info" />

  return (
    <Router>
            <Routes> {/* All the routes are in the routes.ts for readability and cleanliness of the codes */}
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            route.protected ? (
                                <AuthRoute>
                                    <route.component />
                                </AuthRoute>
                            ) : (
                                <route.component />
                            )
                        }
                    />
                ))}
            </Routes>
        </Router>
  )
}

export default App;
