import firebase from 'firebase/compat/app';
import { auth } from '../../configurations/firebase';

export const SignInWithSocialMedia = (provider: firebase.auth.AuthProvider) => 
    new Promise<firebase.auth.UserCredential>((resolve, reject) => {
        auth.signInWithPopup(provider)
        .then(result => resolve(result))
        .catch(error => reject(error));
    });