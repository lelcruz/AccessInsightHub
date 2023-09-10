import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './Styles/App.scss'
import React from 'react'
import RegisterPage from './Pages/Registration/RegistrationPage';
import LoginPage from './Pages/Login/login-page';
import MainPage from './Pages/MainPage/main-page';
import ResearchPage from "./Pages/Research/ResearchPage";
import ChangePasswordPage from './Pages/ChangePasswordPage/changepassword-page';



function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegisterPage />}/>
          <Route path='/main' element={<MainPage />}/>
          <Route path='/research' element={<ResearchPage />}/>
          <Route path='/changepassword' element={<ChangePasswordPage />}/>
      </Routes>
    </Router>

  )
}

export default App;
