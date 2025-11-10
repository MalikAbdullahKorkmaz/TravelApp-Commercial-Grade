
// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUpwYlEHw52s8Vimnq2nFwxJVSL3fjwL0",
  authDomain: "global-explorer-travel-app.firebaseapp.com",
  projectId: "global-explorer-travel-app",
  storageBucket: "global-explorer-travel-app.firebasestorage.app",
  messagingSenderId: "846729989547",
  appId: "1:846729989547:web:f840cf98b3e4a52bd816ee",
  measurementId: "G-SYV71X3TZZ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
