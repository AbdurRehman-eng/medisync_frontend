// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2rSRLhwRnNBo-GDm4q8rSz5Q_h1CIddo",
  authDomain: "medisync-b0fde.firebaseapp.com",
  projectId: "medisync-b0fde",
  storageBucket: "medisync-b0fde.firebasestorage.app",
  messagingSenderId: "830947268635",
  appId: "1:830947268635:web:531f8b58e8011cb29e80be",
  measurementId: "G-6SFV8FY4WN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);