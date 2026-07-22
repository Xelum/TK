import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore, collection, addDoc, setDoc, updateDoc, deleteDoc, doc, onSnapshot, serverTimestamp, runTransaction, getDocs } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBXcvjzPv_7cmcjc4O2xpFsrGG1ydcR4js",
  authDomain: "banca-dati-2bd62.firebaseapp.com",
  projectId: "banca-dati-2bd62",
  storageBucket: "banca-dati-2bd62.firebasestorage.app",
  messagingSenderId: "898295257324",
  appId: "1:898295257324:web:8b7f3678bf3c4f83d72dc9"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth, db, storage,
  signInWithEmailAndPassword, signOut, onAuthStateChanged,
  collection, addDoc, setDoc, updateDoc, deleteDoc, doc, onSnapshot,
  serverTimestamp, runTransaction, getDocs,
  ref, uploadBytes, getDownloadURL, deleteObject
};
