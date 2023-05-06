import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './Styles/App.scss'
import React from 'react'
import Registration from './Pages/Registration/registration';
import LoginPage from './Pages/Login/login-page';
import MainPage from './Pages/MainPage/main-page';



function App() {
  return (
    <Router>
      <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/main' element={<MainPage />}/>

      </Routes>
    </Router>

  )
}

export default App;
