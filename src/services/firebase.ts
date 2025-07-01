import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA7LFvA6_6-Nip1hcgf-FNa5wKQp0QJ4FA",
  authDomain: "arvind-portfolio-blog.firebaseapp.com",
  projectId: "arvind-portfolio-blog",
  storageBucket: "arvind-portfolio-blog.firebasestorage.app",
  messagingSenderId: "332909086729",
  appId: "1:332909086729:web:4e8159a472d6352b2a90d8",
  measurementId: "G-RE0DM7QGP5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(app);

export { db, auth, googleProvider, storage }; 