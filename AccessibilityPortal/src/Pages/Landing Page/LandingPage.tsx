import React from "react";
import {useNavigate} from "react-router-dom";
import "./LandingPage.scss";
import LoginIcon from "../../assets/login-svgrepo-com.svg";
import image from "../../assets/Untitled_design-removebg-preview.png";
import logo from "../../assets/Screenshot_2023-11-21_171255-removebg-preview.png";

//Component for the Landing Page of the website.
function LandingPage() {

    const navigate = useNavigate();

    const directToRegister = () => {
        navigate('/register');
    }

    const directToLogin = () => {
        navigate('/login');
    }
    // Rendering the landing page
    return (
        <>
            <div className="landing-page">
                <nav className="navbar">
                    <div className="container-sm">
                        <img src={logo}></img>
                        <div className="task-menu">
                            <button className="login" onClick={directToLogin}>
                                LOGIN
                            </button>
                            <button onClick={directToRegister}>
                                SIGN UP
                                <span style={{"marginLeft": "10px"}}> <img src={LoginIcon}/></span>
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
                        At AccessInsightHub, we are dedicated to fostering inclusivity and advancing research for
                        accessibility. Our platform serves as a dynamic hub, connecting researchers and participants in
                        a collaborative space dedicated to understanding and improving the experiences of people with
                        disabilities.
                        <br/>
                        Explore a wealth of studies, surveys, and research projects curated to provide valuable insights
                        into various aspects of accessibility. From technological advancements to social inclusion, our
                        platform offers a diverse range of topics that contribute to a deeper understanding of the
                        challenges and opportunities within the disability community.
                    </div>
                </div>

                <div className="introduction-grid">
                    <div className="item">
                        <p className="heading">Dive into Insightful Studies</p>
                        Explore and create a collection of cutting-edge studies that delve into the diverse facets of
                        accessibility. From groundbreaking research to nuanced examinations of societal inclusion, our
                        platform hosts a spectrum of research projects for those passionate about driving positive
                        change.
                    </div>

                    <div className="item">
                        <p className="heading">Participate in Surveys</p>
                        Our platform empowers researchers with the ability to conduct participatory surveys, enabling
                        them to gather first-hand experiences and perspectives from a diverse community.
                    </div>

                    <div className="item">
                        <p className="heading">Connect with Researchers</p>
                        Forge connections with leading experts and researchers. Our portal facilitates direct
                        communication, allowing you to reach out for more information, collaboration opportunities, or
                        to contribute your unique perspective to ongoing studies.
                    </div>

                </div>
            </div>
        </>
    )

}

export default LandingPage;