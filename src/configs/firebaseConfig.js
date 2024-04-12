// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyA9az7MF639cJ6WmD6cnRN-8LcLzatXMzU",
  authDomain: "meeting-manager-d12b2.firebaseapp.com",
  projectId: "meeting-manager-d12b2",
  storageBucket: "meeting-manager-d12b2.appspot.com",
  messagingSenderId: "19597982058",
  appId: "1:19597982058:web:1272d1f56ec0c871774d13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
