import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import "firebase/firestore";

// const firebaseConfig = {
//     apiKey: "AIzaSyACKcRqjXllTiYUq18HpJi2G-d8C_g9wAo",

//     authDomain: "well-marketing.firebaseapp.com",

//     projectId: "well-marketing",

//     storageBucket: "well-marketing.appspot.com",

//     messagingSenderId: "142720539729",

//     appId: "1:142720539729:web:1f924c92541e48d102ac70",

//     measurementId: "G-WWV3D3KWEJ",
// };

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

    authDomain: "well-marketing.firebaseapp.com",

    projectId: "well-marketing",

    storageBucket: "well-marketing.appspot.com",

    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,

    appId: process.env.REACT_APP_FIREBASE_APP_ID,

    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebase_app = initializeApp(firebaseConfig);
export const database = getFirestore(firebase_app);

export default database;
