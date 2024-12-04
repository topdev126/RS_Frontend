// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_h0xTTGuam-Ab1N39xSr1vSJYc4h-4GI",
  authDomain: "sasaestate-37ade.firebaseapp.com",
  projectId: "sasaestate-37ade",
  storageBucket: "sasaestate-37ade.firebasestorage.app",
  messagingSenderId: "960275380228",
  appId: "1:960275380228:web:ed420e38cdd95b4a6f9d51",
  measurementId: "G-MHZ9RB2S0M"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);
