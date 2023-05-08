import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup } from "firebase/auth";
import { ref, child, update, set } from "firebase/database";
import { db, auth } from "firebaseConfig/firebaseAdmin";
import { useRouter } from 'next/router';
import getCurrentUid from '../pages/api/user/getCurrentUID';
// var testAuth = {
//   email: "test@test.me",
//   password: "Test1234"
// }

export async function registerUser() {
  const registerEmail = (document.getElementById("email") as HTMLInputElement).value;
  const registerPassword = (document.getElementById("password") as HTMLInputElement).value;
  const registerUserName = (document.getElementById("username") as HTMLInputElement).value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);

    console.log("Successful registered HERE!")

    const userKey = userCredential.user.uid;

    set(ref(db, 'users/' + userKey), {
      username: registerUserName,
      lname: "",
      lid: "",
    }).then(() => {
      console.log("User data pushed successfully");
      window.location.href = '/login';
    })
    .catch((error) => {
      console.error("Error pushing data:", error);
    });

    // window.location.href = '/login';

  }
  catch(error) {
    console.log(`There was an error creating account: ${error}`)
  }
}

export async function loginUser() {
  const loginEmail = (document.getElementById("email") as HTMLInputElement).value;
  const loginPassword = (document.getElementById("password") as HTMLInputElement).value;
  // const router = useRouter();


  // step 2: add error handling
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    console.log("Successful logged in HERE!");
    const uid :any = await getCurrentUid();
    console.log("TEST", uid)
    sessionStorage.setItem("uid", uid);
    console.log("TES UID", sessionStorage.getItem("uid"))
    window.location.href = '/dashboard';
    // router.push({pathname: '/dashboard'});

  }
  catch(error) {
    console.log(`There was an error: ${error}`);
    alert("There was an error: Please make sure your Email and/or password are correct.");
  }
}

export async function monitorAuthState()  {
  onAuthStateChanged(auth, user => {
    // direct to app after logged in
    if (user) {
      console.log(user);
    }
    // show user is not logged in
    else {
      console.log("Not logged in");
    }
  });
}


export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
    alert("google login successfully");
    const uid :any = await getCurrentUid();
    console.log("Google UID", uid)
    sessionStorage.setItem("uid", uid);
    console.log("TEST GOOGLE UID", sessionStorage.getItem("uid"))
    window.location.href = '/dashboard';
  }).catch((error) => {
    // Handle Errors here.
    // const errorCode = error.code;
    // const errorMessage = error.message;
    // The email of the user's account used.
    // const email = error.customData.email;
    // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

}

export async function logoutUser() {
  await signOut(auth);
  alert('logged out');
}

export async function resetPassword() {
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      alert('Password reset email sent!')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorCode + errorMessage)
    });
}

