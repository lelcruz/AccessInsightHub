import LogoutIcon from "../../assets/logout.svg";
import ProfileIcon from "../../assets/profile.svg"
import ContactUsIcon from "../../assets/contactus.svg"
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import "./bubbleProfile.scss";
import { auth, db } from '../../configurations/firebase';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

interface DropdownItemProps {
  img: string;
  text: string;
  to: string;
}

interface DropdownProps {
  open: boolean;
}

function BubbleProfile() {
    const user = auth.currentUser
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [photoURL, setPhotoURL] = useState(user?.photoURL);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const user = auth.currentUser;
            if (user && user.emailVerified) {
                try {
                    const q = query(collection(db, "users"), where("email", "==", user.email));
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        // Calling for user's profile from Firestore Database
                        setRole(doc.data().role);
                        setFirstName(doc.data().firstName);
                    });
                } catch (error) {
                    
                }
            }
        }

        fetchUserProfile();
        if(user) {
            setPhotoURL(user.photoURL)
        }

        const handler = (e: any) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
    }, [open]);

    return (
        <div className="BubbleProfile">
            <div ref={menuRef}>
                <div className='menu-trigger' onClick={() => { setOpen(!open) }}>
                    {photoURL ? <img src={photoURL} alt="user avatar" /> : <img src={profileIcon} alt="default avatar" />}
                </div>

                <div className={`bubble-menu ${open ? 'active' : 'inactive'}`} >
                    <h3 className="heading">{firstName}<br /><span>{role}</span></h3>
                    <ul>   
                        <DropdownItem img={ProfileIcon} text={"Profile"} to="/profile" />
                        <DropdownItem img={LogoutIcon} text={"Logout"} to="/login"/>
                        <DropdownItem img={ContactUsIcon} text={"Contact Us"} to="/template" />
                    </ul>
                </div>
            </div>
        </div>
        );
    }

    function DropdownItem(props: DropdownItemProps) {

        const navigate = useNavigate();

        const directTo = () => {
            navigate(props.to)
        }
    
        return (
        <li className='dropdownItem' onClick={directTo}>
            <img src={props.img} alt={props.text} />
            <a> {props.text} </a>
        </li>
        );
    }

    export default BubbleProfile;
