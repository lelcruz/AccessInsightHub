import { BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import './Styles/App.scss'
import React, { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import AuthRoute from '../src/CommonComponents/AuthRoute';
import { auth } from './configurations/firebase';
import logging from './configurations/logging';
import routes from './configurations/routes';
import RegisterPage from './Pages/Registration/RegistrationPage';
import LoginPage from './Pages/Login/login-page';
import MainPage from './Pages/MainPage/main-page';
import ResearchPage from "./Pages/Research/ResearchPage";
import ChangePasswordPage from './Pages/ChangePasswordPage/changepassword-page';
import ForgotPasswordPage from './Pages/ForgotPasswordPage/forgotpassword-page';
import LogoutPage from './Pages/LogoutPage/logout-page';
import ResetPasswordPage from './Pages/ResetPasswordPage/resetpassword-page';

function App() {
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
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/main' element={<MainPage />}/>
          <Route path='/research' element={<ResearchPage />}/>
          <Route path='/change' element={<ChangePasswordPage />}/>
          <Route path='/logout' element={<LogoutPage />}/>
          <Route path='/forgot' element={<ForgotPasswordPage />}/>
          <Route path='/reset' element={<ResetPasswordPage />}/>

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
      </Routes>
    </Router>

    
  )
}

export default App;
