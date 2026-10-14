// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJuLLjs_Jfr1VvkgGV1JJ24VyYJ-vKJBc",
    authDomain: "parcial-2-4c065.firebaseapp.com",
    projectId: "parcial-2-4c065",
    storageBucket: "parcial-2-4c065.firebasestorage.app",
    messagingSenderId: "731031498536",
    appId: "1:731031498536:web:dca623a82f661437972a1d",
    measurementId: "G-Q0NP3BBD67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, app, db};