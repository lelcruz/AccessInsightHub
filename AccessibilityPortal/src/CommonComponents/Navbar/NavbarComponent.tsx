import React from "react";
import { Link } from "react-router-dom";
import './NavbarComponent.scss';


const NavbarComponent = () => {
    return (
            <nav className="navbar bg-body-tertiary">
                <div className="container-md">

                    <Link to="/main" className="nav-link active" aria-current="page">Home</Link>
                    <Link to="/register" className="nav-link active" aria-current="page">Surveys</Link>
                    <Link to="/main" className="nav-link active" aria-current="page">Studies</Link>
                    <Link to="/research" className="nav-link active" aria-current="page">Profile</Link>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-dark" type="submit">Search</button>
                    </form>
                </div>
            </nav>


    );
};

export default NavbarComponent;