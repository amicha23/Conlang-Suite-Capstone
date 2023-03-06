import { 
  getAuth, 
  onAuthStateChanged,
  signOut, 
  connectAuthEmulator, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from "firebase/auth";
import app from './firebaseAdmin.js';

const auth = getAuth(app);
connectAuthEmulator(auth, "http://localhost:3000/login");




// btnLogin.addEventListener("click", loginEmailPassword);
const loginEmailPassword = async () => {
  const loginEmail = txtemail.value;
  const loginPassword = txtpassword.value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch(error) {
    console.log(error);

  }
} 

// btnSignUp.addEventListener("click", createAccount);
const createAccount = async () => {
  const createEmail = txtemail.value;
  const createPassword = txtpassword.value;

  const userCredential = await signInWithEmailAndPassword(auth, createEmail, createPassword);
  console.log(userCredential.user);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log(userCredential.user);
  }
  catch(error) {
    console.log(error);

  }
}

const monitorAuthState = async () => {
  onAuthStateChanged(auth, user => {
    // direct to app after logged in
    if (user) {
      console.log(user);
    }
    // show user is not logged in
    else {
    }
  });
}

const logout = async () => {
  await signOut(auth);
}
