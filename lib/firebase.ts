// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAQ88gLWbew4UcLyFxM_g4PBQC5TYyQObI",
  authDomain: "asbfamily-a7b47.firebaseapp.com",
  projectId: "asbfamily-a7b47",
  storageBucket: "asbfamily-a7b47.appspot.com",
  messagingSenderId: "654842478415",
  appId: "1:654842478415:web:7157cf03590369b3778f3a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export { storage };


