import 'firebase/compat/auth'; // If you need authentication
import 'firebase/compat/firestore'; // If you need Firestore
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUJPqkcnbPXM5gv0H2_IBgS63aukG-Bpc",
  authDomain: "chat-c5abe.firebaseapp.com",
  projectId: "chat-c5abe",
  storageBucket: "chat-c5abe.appspot.com",
  messagingSenderId: "838024654332",
  appId: "1:838024654332:web:0c3ede85cc54a7e1515679"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Optional: Initialize Authentication (if needed)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider();

export {db, app, auth, googleProvider} 
