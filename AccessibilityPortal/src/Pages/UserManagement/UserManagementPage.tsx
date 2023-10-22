import { auth, db } from '../../configurations/firebase';
import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import "../../Styles/UserManagement.scss"

function UserManagePage() {


    // Loading list of users to be printed
    const fetchUserProfile = async () => {
        const user = auth.currentUser;
        if (user && user.emailVerified) {
            try {
                const q = query(collection(db, "users"));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    
                    console.log(doc.data().email);
                
                });
            } catch (error) {
                
            }
        }
    }

    useEffect(() => {
        fetchUserProfile();

    }, []);

    return (
        <>
        <h1>User Management Portal</h1>
        </>

    );
}

export default UserManagePage;