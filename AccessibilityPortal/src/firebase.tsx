// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHsf1N2zWQj92tm6mRQmkQSqSGg8l4wkU",
  authDomain: "accessibility-portal.firebaseapp.com",
  projectId: "accessibility-portal",
  storageBucket: "accessibility-portal.appspot.com",
  messagingSenderId: "584811191921",
  appId: "1:584811191921:web:a825e30fbd990fee1dc5d0",
  databaseURL: "https://accessibility-portal-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);