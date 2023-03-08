// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBr0kSz07qYcCT9tWHVJpuWXpVvqbsnvdM",
  authDomain: "langtime-27547.firebaseapp.com",
  databaseURL: "https://langtime-27547-default-rtdb.firebaseio.com",
  projectId: "langtime-27547",
  storageBucket: "langtime-27547.appspot.com",
  messagingSenderId: "687387198900",
  appId: "1:687387198900:web:c666f5a7de775a3d7b1ee1",
  measurementId: "G-5L8L8G099S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);
const auth = getAuth(app)

export {db, auth, app};
