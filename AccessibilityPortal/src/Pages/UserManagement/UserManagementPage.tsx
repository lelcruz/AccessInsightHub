import {db} from '../../configurations/firebase';
import React, {useEffect, useState} from 'react';
import {collection, getDocs, query} from "firebase/firestore";
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

    // Method to get the full name of the user
    getFullName(): string {
        if (this.lastName == "null")
            this.lastName = "";
        return `${this.firstName} ${this.lastName}`;
    }
}

// Function to fetch user profiles from Firestore
async function fetchUserProfile() {
    const newUsers: User[] = [];
    try {
        const q = query(collection(db, "users"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            if (doc.data().role !== "admin") {
                newUsers.push(new User(doc.data().firstName, doc.data().lastName, doc.data().role, doc.data().email, doc.data().dob));
            }
        });
    } catch (error) {
        console.error("Error fetching user profiles:", error);
    }
    return newUsers;
}

// Define the UserManagePage components
function UserManagePage() {
    const [users, setUsers] = useState<User[]>([]);

    // Fetch user profiles when the component mounts
    useEffect(() => {
        async function fetchData() {
            const newUsers = await fetchUserProfile();
            setUsers(newUsers);
        }

        fetchData();
    }, []);

    // Create table rows based on user data
    const tableRows = users.map((user, index) => (
        <tr key={index}>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>{user.getFullName()}</td>
            <td>{user.dob !== "null" ? user.dob : ""}</td>
        </tr>
    ));

    return (
        <div className="main-page">
            <NavbarComponent/>
            <div className="container">
                <h1>User Management Portal</h1>
                <div>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Name</th>
                            <th>Date of Birth</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserManagePage;

