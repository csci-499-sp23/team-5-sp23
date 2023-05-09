// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyD0vyS8miG7sWxE4Pkba7m8mN9hAUxolBg",
  authDomain: "csci499.firebaseapp.com",
  databaseURL: "https://csci499-default-rtdb.firebaseio.com",
  projectId: "csci499",
  storageBucket: "csci499.appspot.com",
  messagingSenderId: "1025285728412",
  appId: "1:1025285728412:web:e38840f5cddd275290e559"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);

