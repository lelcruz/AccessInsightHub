import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "../../Styles/NavbarComponent.scss";
import BubbleProfile from "../BubbleProfile/BubbleProfile"
import {auth, db} from '../../configurations/firebase';
import {collection, getDocs, query, where} from "firebase/firestore";

const NavbarComponent = () => {
    // State to track if the current user is an admin
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    // Handler for the submit event of the search form
    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents the default form submission behavior
        console.log("Submit!"); // Placeholder for submit logic
    };

    // useEffect hook to determine if the logged-in user is an admin
    useEffect(() => {
        auth.onAuthStateChanged(async user => {
            if (user && user.emailVerified) {
                // Query to check the user's role from the database
                const q = query(collection(db, "users"), where("email", "==", user.email));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    if (doc.data().role === "admin") {
                        setIsAdmin(true); // Set isAdmin to true if user is an admin
                    }
                });
            }
        });
    }, []);

    // Rendering the navigation bar with conditional links for admin users

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
                {
                    isAdmin ?
                        <>
                            <Link to="/usermanage" className="nav-link active" aria-current="page">
                                Users
                            </Link>
                        </>

                        : <></>
                }
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
                <BubbleProfile/>
            </div>
        </nav>
    );

};

export default NavbarComponent;