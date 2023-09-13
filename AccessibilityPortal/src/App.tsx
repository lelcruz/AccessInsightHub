import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './Styles/App.scss'
import React from 'react'
import RegistrationPage from './Pages/Registration/RegistrationPage';
import LoginPage from './Pages/Login/login-page';
import MainPage from './Pages/MainPage/main-page';
import ResearchPage from "./Pages/Research/ResearchPage";
import SurveyPage from './Pages/Survey/SurveyPage';
import ProfilePage from './Pages/Profile/ProfilePage';
import TemplatePage from './Pages/Template/TemplatePage';



function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<RegistrationPage />}/>
          <Route path='/main' element={<MainPage />}/>
          <Route path='/research' element={<ResearchPage />}/>
      </Routes>
    </Router>

  )
}

export default App;
