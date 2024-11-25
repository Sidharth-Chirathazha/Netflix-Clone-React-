// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGDDhegqynH9KAAfLZ91e5t-X2_HsbzI0",
  authDomain: "netflix-clone-7f9b0.firebaseapp.com",
  projectId: "netflix-clone-7f9b0",
  storageBucket: "netflix-clone-7f9b0.firebasestorage.app",
  messagingSenderId: "576587197709",
  appId: "1:576587197709:web:2a609f069a0ba368e05444"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const signup = async(name,email,password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));    
    }
}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);        
    } catch (error) {        
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));    
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};