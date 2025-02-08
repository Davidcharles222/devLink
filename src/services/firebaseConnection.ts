import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAwCUIKVx9LUOQw_Gi8ShrNyX36srHyHbw",
  authDomain: "devlinks-6e335.firebaseapp.com",
  projectId: "devlinks-6e335",
  storageBucket: "devlinks-6e335.firebasestorage.app",
  messagingSenderId: "342803679883",
  appId: "1:342803679883:web:6a43294004b4b651a4228e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
