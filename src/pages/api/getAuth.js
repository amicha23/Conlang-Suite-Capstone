import { 
  onAuthStateChanged,
  signOut, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider } from "firebase/auth";
import { ref, child, push, update } from "firebase/database";
import { auth } from "firebaseConfig/firebaseAdmin";

// var testAuth = {
//   email: "test@test.me",
//   password: "Test1234"
// }


// btnSignUp.addEventListener("click", createAccount);
async function createAccount(data) {
  const createEmail = "jessie.zengrm@gmail.com";
  const createPassword = "txtpassword.value";
  const _username = "txtuser.value123";

  var userData = {
    username: _username, 
    lid: "",
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

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, createEmail, createPassword);
    console.log(userCredential.user.uid);
  }
  catch(error) {
    console.log(`There was an error: ${error}`)
    showLoginError(error)
  }
}

async function loginEmailPassword(data) {
  const loginEmail = data.user_email;
  const loginPassword = data.user_password;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
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

async function resetPassword(error) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}

async function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}




export default function handler(req, res) {
  // console.log(req.body);
  try {
    console.log("tried pushing new user data to database");
    const data = JSON.parse(req.body);

    loginEmailPassword(data);

    console.log("Sent user data to the database");
    res.status(200).json("Sent user data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
