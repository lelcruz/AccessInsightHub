import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import LoginIcon from "../../assets/login-svgrepo-com.svg";
import image from "../../assets/Untitled_design-removebg-preview.png";

function LandingPage() {

    const navigate = useNavigate();

    const directToRegister = () => {
        navigate('/register');
    }

    const directToLogin = () => {
        navigate('/login');
    }

    return(
        <>
        <div className="main-page">
            <nav className="navbar">
                <div className="container-sm">
                    <h3>Accessibility Portal</h3>
                    <div className="task-menu">
                        <button className="login" onClick={directToLogin}>
                            LOGIN 
                        </button>
                        <button onClick={directToRegister}>
                            SIGN UP
                            <span style={{"marginLeft" : "10px"}}> <img src={LoginIcon} /></span>
                        </button>
                    </div>
                </div>
            </nav>

            <svg viewBox="0 0 500 40">
                <path d="M 0,10 C 150,40 350,0 500,5 L 500,00 L 0,0" fill="snow"></path>
            </svg>

            <div className="illustration">
                <img src={image}></img>
                <div className="greeting"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla egestas eros, eu commodo ante dignissim in. Sed quis ultricies justo. Suspendisse lectus sapien, tristique quis neque facilisis, imperdiet ultrices odio. Nulla sagittis sagittis purus, vel facilisis ante faucibus sed. Etiam efficitur justo iaculis erat viverra dapibus at nec lectus. 
                </div>
            </div>

            <div className="introduction-grid">
                <p className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla egestas eros, eu commodo ante dignissim in. Sed quis ultricies justo. Suspendisse lectus sapien, tristique quis neque facilisis, imperdiet ultrices odio.</p>
                <p className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla egestas eros, eu commodo ante dignissim in. Sed quis ultricies justo. Suspendisse lectus sapien, tristique quis neque facilisis, imperdiet ultrices odio.</p>
                <p className="item">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris fringilla egestas eros, eu commodo ante dignissim in. Sed quis ultricies justo. Suspendisse lectus sapien, tristique quis neque facilisis, imperdiet ultrices odio.</p>
            </div>
        </div>
        <div className="footer">
            <p> Hello</p>
        </div>
        </>
    )

}
export default LandingPage;