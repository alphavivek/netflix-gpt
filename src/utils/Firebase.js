// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpEj-9lLbIwLlDw1wjChu29cuFIkqnF7o",
  authDomain: "netflixgpt-30ff2.firebaseapp.com",
  projectId: "netflixgpt-30ff2",
  storageBucket: "netflixgpt-30ff2.appspot.com",
  messagingSenderId: "416376335329",
  appId: "1:416376335329:web:870348197a4166d62340a0",
  measurementId: "G-XZ9847749Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();