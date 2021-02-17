import firebase from "firebase/app"
import "firebase/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBaVpTCf-2RVs_CDDoJbe_usyBqwb6a9TU",
  authDomain: "cp-all-project.firebaseapp.com",
  projectId: "cp-all-project",
  storageBucket: "cp-all-project.appspot.com",
  messagingSenderId: "212514285950",
  appId: "1:212514285950:web:f2b6cf45c309e11fa06b2f"
});

const db = firebaseApp.firestore();

export default db; 