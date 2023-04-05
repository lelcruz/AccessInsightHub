import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

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
