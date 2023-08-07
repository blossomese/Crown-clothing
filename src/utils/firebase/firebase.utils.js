import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import {
getFirestore,
doc,
getDoc,
setDoc
} from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyDBf8_9TSG5N2GpqXPIiKdyQPTU-m6-E0U",
  authDomain: "crown-clothing-db-4dc15.firebaseapp.com",
  projectId: "crown-clothing-db-4dc15",
  storageBucket: "crown-clothing-db-4dc15.appspot.com",
  messagingSenderId: "75168887685",
  appId: "1:75168887685:web:d89738c76990c8173e8aec",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
 const userDocRef = doc(db, 'users', userAuth.uid)
console.log(userDocRef);


const userSnapshot = await getDoc(userDocRef)

if(!userSnapshot.exists()){
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
       await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
       }) 
    } catch (error) {
       console.log('Error creating the user', error.message); 
    }
}
return userDocRef
}