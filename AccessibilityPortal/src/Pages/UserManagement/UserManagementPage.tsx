import { auth, db } from '../../configurations/firebase';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../../Styles/UserManagement.scss"

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
                    console.log(doc.data().email)
                });
                setUsers(newUsers); // Update users
            } catch (error) {
                console.error("Error fetching user profiles:", error);
            }
        }

        //fetchUserProfile();
        
   
    function userTable() {

        console.log(users.length)

        const userElements = users.map((user, index) => (
            <div key={index}>
                <p>
                    <b>  Email: </b> {user.email} 
                    <b>  Role: </b> {user.role}
                    <b>  Name: </b> {user.getFullName()} 
                    <b>  DOB: </b> {user.dob}</p>
            </div>
        ));

        return (
            <div>
                {userElements}
            </div>
        ); 
    }

    return (
        <>

        <h1>User Management Portal</h1>
        { userTable() }

        </>

    );
}

export default UserManagePage;