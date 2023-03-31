import { useState } from 'react'

import './Styles/App.css'
import React from 'react'
import Registration from './Pages/Registration/registration';
import LoginPage from './Pages/Login/login-page';


function App() {

  return (
    <div className="App">

    <div style={{padding: 100, }}>
    <Registration />
    </div>

    <LoginPage />
    </div>

  )
}

export default App
