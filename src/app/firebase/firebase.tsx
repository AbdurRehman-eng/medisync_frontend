// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2rSRLhwRnNBo-GDm4q8rSz5Q_h1CIddo",
  authDomain: "medisync-b0fde.firebaseapp.com",
  projectId: "medisync-b0fde",
  storageBucket: "medisync-b0fde.firebasestorage.app",
  messagingSenderId: "830947268635",
  appId: "1:830947268635:web:531f8b58e8011cb29e80be",
  measurementId: "G-6SFV8FY4WN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== "undefined") {
  // Check if Analytics is supported and initialize it only in the browser
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("Firebase Analytics initialized successfully!");
      }
    })
    .catch((err) => {
      console.error("Error checking Analytics support:", err);
    });
}

export const auth = getAuth(app);
export { analytics };
