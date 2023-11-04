// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-eee83.firebaseapp.com",
  projectId: "mern-estate-eee83",
  storageBucket: "mern-estate-eee83.appspot.com",
  messagingSenderId: "686394210190",
  appId: "1:686394210190:web:c3894343a02322b74d96df",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
