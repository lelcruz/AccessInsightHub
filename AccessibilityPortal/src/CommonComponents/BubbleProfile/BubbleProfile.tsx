import LogoutIcon from "../../assets/logout.svg";
import ProfileIcon from "../../assets/profile.svg"
import ContactUsIcon from "../../assets/contactus.svg"
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import "./bubbleProfile.scss";
import {auth, db} from '../../configurations/firebase';
import React, {useEffect, useRef, useState} from 'react';
import {collection, getDocs, query, where} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Logout from "../../Pages/LogoutPage/logout";
import ContactUsModal from "./ContactUsModal";

// Interface for Dropdown Item properties
interface DropdownItemProps {
    img: string;  // URL or path to the image to display in the dropdown item
    text: string; // Text label for the dropdown item
    to: string;   // URL or path to navigate to when this item is clicked
}

// Interface for Dropdown properties
interface DropdownProps {
    open: boolean; // Flag to indicate whether the dropdown is open or closed
}

// The BubbleProfile functional component is used to create a user profile bubble
// with dropdown options like profile viewing, contact, and logout.
function BubbleProfile() {
    // User authentication and state management
    const user = auth.currentUser;
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [photoURL, setPhotoURL] = useState(user?.photoURL);
    const menuRef = useRef<HTMLDivElement>(null);
    const [openLogout, setOpenLogout] = useState(false);

    const navigate = useNavigate();

    // Function to navigate to the user's profile page
    const directToProfilePage = () => {
        navigate('/profile');
    }

    // Function to toggle the logout confirmation dialog
    const handleLogout = () => {
        setOpenLogout(!openLogout);
    }

    // Function to render the Contact Us modal
    const contactUs = () => {
        return <ContactUsModal/>;
    }

    // useEffect hook to fetch user profile data from the Firestore Database
    // and set event listener for closing the dropdown when clicking outside of it
    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user && user.emailVerified) {
                try {
                    // Fetch user details from Firestore based on their email
                    const q = query(collection(db, "users"), where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        setRole(doc.data().role);
                        setFirstName(doc.data().firstName);
                        setPhotoURL(user.photoURL);
                    });
                } catch (error) {
                    // Handle errors here, if any
                }
            }
        }

        fetchUserProfile();

        // Event handler to close the dropdown if clicked outside
        const handler = (e: any) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);

        // Cleanup function for the event listener
        return () => {
            document.removeEventListener("mousedown", handler);
        }
    }, [open]);

    // Render function for the BubbleProfile component
    return (
        <>
            {openLogout && <Logout opened={true}/>}
            <div className="BubbleProfile">
                {/* Profile icon and dropdown menu logic */}
                <div ref={menuRef}>
                    {/* User avatar and event handler for opening/closing the dropdown */}
                    <div className='menu-trigger' onClick={() => {
                        setOpen(!open)
                    }}>
                        {photoURL ? <img src={photoURL} alt="user avatar"/> :
                            <img src={profileIcon} alt="default avatar"/>}
                    </div>

                    {/* Dropdown menu items for Profile, Contact Us, and Logout */}
                    <div className={`bubble-menu ${open ? 'active' : 'inactive'}`}>
                        <h3 className="heading">{firstName}<br/><span>{role}</span></h3>
                        <ul>
                            <li onClick={directToProfilePage} className='dropdownItem'>
                                <img src={ProfileIcon} alt={"Profile"}/>Profile
                            </li>
                            <li onClick={contactUs} className='dropdownItem'>
                                <img src={ContactUsIcon} alt={"Contact Us"}/>Contact us
                            </li>
                            <li onClick={handleLogout} className='dropdownItem'>
                                <img src={LogoutIcon} alt={"Log Out"}/>Logout
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BubbleProfile;

