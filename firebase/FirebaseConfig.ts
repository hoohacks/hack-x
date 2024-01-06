// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgKP0sTgWr45XtjTjaRDKi0EhfP0ZCWIw",
  authDomain: "hoohacks-hack-x.firebaseapp.com",
  projectId: "hoohacks-hack-x",
  storageBucket: "hoohacks-hack-x.appspot.com",
  messagingSenderId: "127866380488",
  appId: "1:127866380488:web:e170df1324600a828345fd",
  measurementId: "G-4BH7XCV8GE"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
export const ADMIN_PASSWORD = "partylife";
export const SPONSOR_PASSWORD = "nightlife";
