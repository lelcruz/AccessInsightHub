import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './Styles/App.scss'
import React from 'react'
import Registration from './Pages/Registration/registration';
import LoginPage from './Pages/Login/login-page';
import MainPage from './Pages/MainPage/main-page';
import ResearchPage from "./Pages/Research/ResearchPage";



function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/main' element={<MainPage />}/>
          <Route path='/research' element={<ResearchPage />}/>

      </Routes>
    </Router>

  )
}

export default App;
