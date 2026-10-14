import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDkRPdmXnt7o0qNntCXjbh6fc9DXOgMPuM",
    authDomain: "challenge-09-559ad.firebaseapp.com",
    projectId: "challenge-09-559ad",
    storageBucket: "challenge-09-559ad.firebasestorage.app",
    messagingSenderId: "123639345482",
    appId: "1:123639345482:web:e1946b7a30e7a17bd351b3",
    measurementId: "G-75WPLY7RD1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);