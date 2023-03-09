import { 
  onAuthStateChanged,
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword } from "firebase/auth";
import { ref, child, push, update } from "firebase/database";
// connectAuthEmulator(auth, "http://localhost:3000/login");


// btnSignUp.addEventListener("click", createAccount);
const createAccount = async () => {
  const createEmail = "jessie.zengrm@gmail.com";
  const createPassword = "txtpassword.value";
  const _username = "txtuser.value123";

  var userData = {
    username: _username, 
    lid: "",
    lname: "",
  }
  // don't need manual generated user id, get the signed-in user's unique user ID from the auth variable 
  const newUserKey = push(child(ref(db),'users')).key;
  const updates = {}
  updates['/users/' + newUserKey] = userData;

  update(ref(db), (updates)).then(() => {
    console.log("User data pushed successfully");
  })
  .catch((error) => {
    console.error("Error pushing data:", error);

  });

  const userCredential = await createUserWithEmailAndPassword(auth, createEmail, createPassword);
  console.log(userCredential.user);

  // try {
  //   const userCredential = await createUserWithEmailAndPassword(auth, loginEmail, loginPassword);
  //   console.log(userCredential.user);
  // }
  // catch(error) {
  //   console.log(error);

  // }
}

// btnLogin.addEventListener("click", loginEmailPassword);
// const loginEmailPassword = async () => {
//   const loginEmail = txtemail.value;
//   const loginPassword = txtpassword.value;

//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
//     console.log(userCredential.user);
//   }
//   catch(error) {
//     console.log(error);

//   }
// } 


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


export default function handler(req, res) {
  console.log(req.body);
  try {
    console.log("tried pushing new user data to database");
    const data = JSON.parse(req.body);
    
    createAccount();



    console.log("Sent user data to the database!");
    res.status(200).json("Sent user data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
