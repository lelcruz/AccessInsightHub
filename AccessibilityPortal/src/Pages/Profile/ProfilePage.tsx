import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "../../Styles/ProfilePage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import EditModal from "./EditModal";
import PasswordModal from "./PasswordModal";
import ProfileImage from "../../CommonComponents/Profile Image/ProfileImage";
import { auth, db } from '../../configurations/firebase';
import Logout from "../LogoutPage/logout";
import { useNavigate } from "react-router-dom";

function ProfilePage(){

    const [role, setRole] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [dob, setDOB] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [signInWithGG, setSignInWithGG] = useState<boolean>(false);
    const [reload, setReload] = useState<boolean>(false);

    const navigate = useNavigate();

    const triggerReload = () => {
        setReload(prev => !prev); // Toggle the reload state
    };

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
                    setLastName(doc.data().lastName);
                    setEmail(doc.data().email);
                    setDOB(doc.data().dob);
                    setSignInWithGG(doc.data().signInWithGoogle);
                });
            } catch (error) {
                navigate('/login');
            }
        }
    }

    useEffect(() => {
        fetchUserProfile();
        if(reload) {
            fetchUserProfile();
            setReload(false)
        }
    }, [reload]);
    
    return (
        <div className="main-page">
            <NavbarComponent/>
        <div className="container">
            <div className="avatar"> 
                <ProfileImage />
            </div>

            {/* Data table storing user information */}
            <div className="table-wrap">
                <div className="table-responsive">
                    <h1>Profile Information</h1>
                    <h4>Manage your personal information</h4>
                    <table className="table table-hover">
                        <tbody>
                            <tr>
                            <th scope="row">Name</th>
                            <td>{firstName + "   " + lastName}</td>
                            </tr>
                            <tr>
                            <th scope="row">Date of Birth</th>
                            <td>{dob}</td>
                            </tr>
                            <tr>
                            <th scope="row">Email Address</th>
                            <td>{email}</td>
                            </tr>
                            <tr>
                            <th scope="row">Role</th>
                            <td>{role}</td>
                            </tr>
                            <tr>
                            <th scope="row">Saved Studies</th>
                            <td><a href="#">Edit Saved Studies</a></td>
                            </tr>
                            <tr>
                            <th scope="row">Preferences</th>
                            <td><a href="#">Edit Preferences</a></td>
                            </tr>
                            <tr>
                            <th scope="row">Password</th>
                            <td>{signInWithGG ? <PasswordModal /> : <p>Unavailable</p>}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="edit">
                            <EditModal triggerReload={triggerReload} />
                            <span style={{marginRight: "30px"}}></span>
                            <Logout/>
                    </div>
                </div>
           </div>
        </div>   
    </div>

    );


}

export default ProfilePage;