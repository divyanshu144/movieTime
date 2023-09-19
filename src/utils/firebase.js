// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqiWeZGQ1Z610I08CTvItI-0T_PMPmd34",
  authDomain: "netflix-gpt-39d76.firebaseapp.com",
  projectId: "netflix-gpt-39d76",
  storageBucket: "netflix-gpt-39d76.appspot.com",
  messagingSenderId: "406835371999",
  appId: "1:406835371999:web:56a94d368ed0d6fe122e6a",
  measurementId: "G-21TP6PFEMR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();