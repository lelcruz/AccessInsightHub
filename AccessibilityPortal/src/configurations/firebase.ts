import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './config';
import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(Firebase);

// Initialize Authentication Firebase
export const auth = firebase.auth();

// Export Firebase
export default Firebase;