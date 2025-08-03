// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpqShfbxNT5pf6pXnJ_laVO6j8KHa23MY",
  authDomain: "expense-tracker-eb505.firebaseapp.com",
  projectId: "expense-tracker-eb505",
  storageBucket: "expense-tracker-eb505.firebasestorage.app",
  messagingSenderId: "1077865337917",
  appId: "1:1077865337917:web:7d3005cf0d39d43f968654",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

//firebase login
//firebase init
//firebase deploy --only hosting:expense-tracker-eb505-e3530
