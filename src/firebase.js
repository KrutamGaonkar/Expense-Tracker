// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3H9gsTRV4Rc1imqupOAllIsDAKtEpYcI",
  authDomain: "expense-tracker-a88f7.firebaseapp.com",
  projectId: "expense-tracker-a88f7",
  storageBucket: "expense-tracker-a88f7.appspot.com",
  messagingSenderId: "735782176714",
  appId: "1:735782176714:web:117e31536666a13043f133",
  measurementId: "G-YWRXEBJM0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc, updateDoc, deleteDoc }; 