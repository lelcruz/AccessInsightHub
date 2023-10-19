import LogoutIcon from "../../assets/logout.svg";
import ProfileIcon from "../../assets/profile.svg"
import ContactUsIcon from "../../assets/contactus.svg"
import profileIcon from "../../assets/profile-circle-svgrepo-com.svg";
import "./bubbleProfile.scss";
import { auth, db } from '../../configurations/firebase';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";

interface DropdownItemProps {
  img: string;
  text: string;
}

//interface DropdownProps {
  //open: boolean;
//}

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

    }, []);

    useEffect (() => {
        const handler = (e: any) => {
            console.log("Clicked inside handler");
            if (open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
                console.log("IF");
                setOpen(false);
            }
            else {
                console.log("ELSE");
            }
        };
        
        document.addEventListener("mousedown", handler);

        //return () => {
            //document.removeEventListener("mousedown", handler);
        //}
    }, [open]);

    return (
        <div className="BubbleProfile">
            <div className='menu-container' ref={menuRef}>
                <div className='menu-trigger' onClick={() => { setOpen(!open); console.log(!open) }}>
                    {photoURL ? <img src={photoURL} alt="user avatar" /> : <img src={profileIcon} alt="default avatar" />}
                </div>

                <div className={`bubble-menu ${open ? 'active' : 'inactive'}`} >
                    <h3 className="heading">{firstName}<br /><span>{role}</span></h3>
                    <ul>   
                        <DropdownItem img={ProfileIcon} text={"Profile"} />
                        <DropdownItem img={LogoutIcon} text={"Logout"} />
                        <DropdownItem img={ContactUsIcon} text={"Contact Us"} />
                    </ul>
                </div>
            </div>
        </div>
        );
    }

    function DropdownItem(props: DropdownItemProps) {
        return (
        <li className='dropdownItem'>
            <img src={props.img} alt={props.text} />
            <a> {props.text} </a>
        </li>
        );
    }

    export default BubbleProfile;
