import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import "../../Styles/ProfilePage.scss";
import NavbarComponent from "../../CommonComponents/Navbar/NavbarComponent";
import ProfileImage from "../../CommonComponents/Profile Image/ProfileImage";
import { auth, db } from '../../configurations/firebase';
import Logout from "../LogoutPage/logout";
import { useNavigate } from "react-router-dom";

function MessagePage(){

    
    
    return (
      <></>
    );


}

export default MessagePage;