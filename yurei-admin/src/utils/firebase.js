// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFxfMrsbA6bafSOTgtDLeLTHR89MHZWEg",
  authDomain: "yurei-admin.firebaseapp.com",
  databaseURL: "https://yurei-admin-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "yurei-admin",
  storageBucket: "yurei-admin.appspot.com",
  messagingSenderId: "60541506093",
  appId: "1:60541506093:web:09feacddf1580c05269ea4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getDatabase(app)
export default app;