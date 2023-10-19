import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from './config';
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from 'firebase/auth';

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig.firebase);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(Firebase);

// Initialize Authentication Firebase
export const auth = firebase.auth();

// Initialize Storage Firebase
export const storage = getStorage();
export async function upload(file: File, currentUser: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) {
    const fileRef = ref(storage, `${currentUser.uid}.png`);
  
    setLoading(true);
  
    try {
      const snapshot = await uploadBytes(fileRef, file);
      const photoURL = await getDownloadURL(snapshot.ref);
  
      await updateProfile(currentUser, { photoURL });
  
      setLoading(false);
      alert("Uploaded file!");
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
      alert('Error uploading file. Please try again.');
    }
  }

// Export Firebase
export default Firebase;