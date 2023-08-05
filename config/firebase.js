import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBLy1JX2tdbEeW2m9_KX_951GtbWuLtZEM",
  authDomain: "chat-app-93bf8.firebaseapp.com",
  projectId: "chat-app-93bf8",
  storageBucket: "chat-app-93bf8.appspot.com",
  messagingSenderId: "439802101036",
  appId: "1:439802101036:web:eeaff5de8066389ccd4089",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
