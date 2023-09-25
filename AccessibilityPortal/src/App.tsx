import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./Styles/App.scss";
import React from "react";
import RegistrationPage from "./Pages/Registration/RegistrationPage";
import LoginPage from "./Pages/Login/login-page";
import MainPage from "./Pages/MainPage/main-page";
import StudiesPage from "./Pages/Research/StudiesPage";
import SurveyPage from "./Pages/Survey/SurveyPage";
import ProfilePage from "./Pages/Profile/ProfilePage";
import TemplatePage from "./Pages/Template/TemplatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/studies" element={<StudiesPage />} />
        <Route path="/survey" element={<SurveyPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/template" element={<TemplatePage />} />
      </Routes>
    </Router>
  );
}

export default App;
