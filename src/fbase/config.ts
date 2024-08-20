import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyACKcRqjXllTiYUq18HpJi2G-d8C_g9wAo",

    authDomain: "well-marketing.firebaseapp.com",

    projectId: "well-marketing",

    storageBucket: "well-marketing.appspot.com",

    messagingSenderId: "142720539729",

    appId: "1:142720539729:web:1f924c92541e48d102ac70",

    measurementId: "G-WWV3D3KWEJ",
};

const firebase_app = initializeApp(firebaseConfig);
export const database = getFirestore(firebase_app);

export default database;
