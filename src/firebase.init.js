// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCxTHv284wVQs27UkDk-q9itQlInpHPOBg",
    authDomain: "outshade-e4ec9.firebaseapp.com",
    projectId: "outshade-e4ec9",
    storageBucket: "outshade-e4ec9.appspot.com",
    messagingSenderId: "351442813690",
    appId: "1:351442813690:web:d4ffa36aa5d3bc0c05ff43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;