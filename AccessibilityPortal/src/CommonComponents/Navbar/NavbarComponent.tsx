import React from "react";
import { Link } from "react-router-dom";
import "./NavbarComponent.scss";
import BubbleProfile from "../BubbleProfile/BubbleProfile"

const NavbarComponent = () => {

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submit!");
  };
  return (
    <nav className="navbar">
      <div className="container-md">
        <Link to="/main" className="nav-link active" aria-current="page">
          Home
        </Link>
        <Link to="/survey" className="nav-link active" aria-current="page">
          Surveys
        </Link>
        <Link to="/studies" className="nav-link active" aria-current="page">
          Studies
        </Link>
        <Link to="/profile" className="nav-link active" aria-current="page">
          Profile
        </Link>
        <form onSubmit={submitHandler} className="search-bar" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-dark" type="submit">
            Search
          </button>
          
        </form>
        <BubbleProfile />
      </div>
    </nav>
  );

};

export default NavbarComponent;
