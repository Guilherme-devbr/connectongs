import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig = {
  apiKey: "AIzaSyBfJvotR8eq8L_UDoILJ5r8TchbkOgJDKA",
  authDomain: "connectongs.firebaseapp.com",
  projectId: "connectongs",
  storageBucket: "connectongs.firebasestorage.app",
  messagingSenderId: "190917753734",
  appId: "1:190917753734:web:2cad40656464cd406a8a07",
  measurementId: "G-WDJJ80R0TP9"
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);