// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpXERAFIkPfHMS99NrZ_BtrYV-bRBujJw",
  authDomain: "react-social-media-e2b74.firebaseapp.com",
  projectId: "react-social-media-e2b74",
  storageBucket: "react-social-media-e2b74.firebasestorage.app",
  messagingSenderId: "246619382757",
  appId: "1:246619382757:web:370f16e0b715a0dab0850c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider=new GoogleAuthProvider()


export const db=getFirestore(app)