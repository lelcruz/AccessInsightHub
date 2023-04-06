import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ReactDOM from "react-dom/client";
import './Styles/App.scss'
import React from 'react'
import Registration from './Pages/Registration/registration';
import LoginPage from './Pages/Login/login-page';


export default function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='/register' element={<Registration />}/>
        

      </Routes>
    </Router>

  )
}


const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
