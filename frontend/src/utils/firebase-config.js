
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAosDbJF5PB14cgwLjp-jpWv5ph6CJJeyQ",
  authDomain: "netflix-clone-d3934.firebaseapp.com",
  projectId: "netflix-clone-d3934",
  storageBucket: "netflix-clone-d3934.firebasestorage.app",
  messagingSenderId: "581480365749",
  appId: "1:581480365749:web:54992a87cbf60f4d3808fc",
  measurementId: "G-KLMH3FCYDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)