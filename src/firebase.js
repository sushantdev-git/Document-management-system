import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider,signInWithPopup} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDL-q5uTgRWOF7oEbdeahPcFE_Tt25oVnQ",
  authDomain: "documentmanagementsystem-d786a.firebaseapp.com",
  projectId: "documentmanagementsystem-d786a",
  storageBucket: "documentmanagementsystem-d786a.appspot.com",
  messagingSenderId: "62866599283",
  appId: "1:62866599283:web:582b3536221cfe006e2906",
  measurementId: "G-52VE027VP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)