// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcFe38bP5pKMwCxap5SIEmPrbqcX6Rl4A",
  authDomain: "gqlmern137.firebaseapp.com",
  projectId: "gqlmern137",
  storageBucket: "gqlmern137.appspot.com",
  messagingSenderId: "948578520007",
  appId: "1:948578520007:web:5c0e7c16ddcff65659e7e2",
  measurementId: "G-MRR7GWEBL8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const googleAuth = new GoogleAuthProvider()
const analytics = getAnalytics(app);