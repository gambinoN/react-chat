import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCUJPqkcnbPXM5gv0H2_IBgS63aukG-Bpc",
  authDomain: "chat-c5abe.firebaseapp.com",
  projectId: "chat-c5abe",
  storageBucket: "chat-c5abe.appspot.com",
  messagingSenderId: "838024654332",
  appId: "1:838024654332:web:0c3ede85cc54a7e1515679"
};

// Initialize Firebase
const firebase = Firebase.initializeApp(firebaseConfig)
const {fieldValue} = Firebase.firestore

export {firebase, fieldValue} 
