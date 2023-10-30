import { auth, db } from '../../configurations/firebase';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../../Styles/UserManagement.scss"
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import "../../Styles/ProfilePage.scss";

class User {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    dob: string;

    constructor(firstName: string, lastName: string, role: string, email: string, dob: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
        this.email = email;
        this.dob = dob;
    }

    getFullName(): string {
        if(this.lastName == "null") 
            this.lastName = "";
        return `${this.firstName} ${this.lastName}`;
    }
}

function UserManagePage() {

    const newUsers: User[] = [];
    const [users, setUsers] = useState<User[]>([]);


    // Loading list of users to be printed
    async function fetchUserProfile() {
        try {
            const q = query(collection(db, "users"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {

                if(doc.data().role != "admin") 
                    newUsers.push(new User(doc.data().firstName, doc.data().lastName, doc.data().role, doc.data().email, doc.data().dob));
            });
            setUsers(newUsers); // Update users
        } catch (error) {
            console.error("Error fetching user profiles:", error);
        }
    }

    useEffect(() => {
        fetchUserProfile();
    }, []);

    function userTable() {
        
        const tableRows = users.map((user, index) => (
            <tr key={index}>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.getFullName()}</td>
                <td>{user.dob != "null" ? user.dob : ""}</td>
            </tr>
        ));

        console.log("Fetched")

        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>DOB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>
            </div>
        ); 
    }
    

    return (
        <>
            <div className="main-page">
                <NavbarComponent/>
                <div className="container">
                    <h1>User Management Portal</h1>
                    { userTable() }

                </div>
            </div>

        </>

    );
}

export default UserManagePage;