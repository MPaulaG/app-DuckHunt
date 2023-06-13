
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";

export const firebaseConfig = {
  apiKey: "AIzaSyA-E6p5H3oBNQ5SEAndJe0fFzAeQ64Y6bY",
  authDomain: "duck-hunt-122e0.firebaseapp.com",
  projectId: "duck-hunt-122e0",
  storageBucket: "duck-hunt-122e0.appspot.com",
  messagingSenderId: "980883797940",
  appId: "1:980883797940:web:14ad946f581f13c221e4e1"
};


const app = initializeApp(firebaseConfig);
export const db= getDatabase(app)