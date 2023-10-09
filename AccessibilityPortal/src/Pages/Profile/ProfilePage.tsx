import React, {useState} from 'react';
import '../../Styles/ProfilePage.scss';
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import EditModal from "./EditModal";
import ProfileImage from "../../CommonComponents/Profile Image/ProfileImage";


function ProfilePage(){

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
                    <table className="table table-hover">
                        <h1>Profile Information</h1>
                        <h4>Manage your personal information</h4>
                        <tbody>
                            <tr>
                            <th scope="row">Name</th>
                            <td>Nhi</td>
                            </tr>
                            <tr>
                            <th scope="row">Date of Birth</th>
                            <td>August 11, 2000</td>
                            </tr>
                            <tr>
                            <th scope="row">Email Address</th>
                            <td>Nhynhy@gmail.com</td>
                            </tr>
                            <tr>
                            <th scope="row">Role</th>
                            <td>Admin</td>
                            </tr>
                            <tr>
                            <th scope="row">Saved Studies</th>
                            <td><a href="#">Edit Saved Studies</a></td>
                            </tr>
                            <tr>
                            <th scope="row">Preferences</th>
                            <td><a href="#">Edit Preferences</a></td>
                            </tr>
                        </tbody>
                        <div className="edit"><EditModal/> </div>
                    </table>
                </div>
           </div>
        </div>   
    </div>


    

    );

}

export default ProfilePage;