// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-55336.firebaseapp.com",
  projectId: "mern-estate-55336",
  storageBucket: "mern-estate-55336.appspot.com",
  messagingSenderId: "649064320745",
  appId: "1:649064320745:web:4861c1d332b920b34d6a78"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);