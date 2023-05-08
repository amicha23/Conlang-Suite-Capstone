import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup } from "firebase/auth";
import { ref, child, update, set, get } from "firebase/database";
import { db, auth } from "firebaseConfig/firebaseAdmin";
import { useRouter } from "next/router";
// var testAuth = {
//   email: "test@test.me",
//   password: "Test1234"
// }

export async function registerUser() {
  const registerEmail = (document.getElementById("email") as HTMLInputElement)
    .value;
  const registerPassword = (
    document.getElementById("password") as HTMLInputElement
  ).value;
  const registerUserName = (
    document.getElementById("username") as HTMLInputElement
  ).value;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      registerEmail,
      registerPassword
    );

    console.log("Successful registered HERE!");

    const userKey = userCredential.user.uid;

    const currTime = getCurrTime();

    set(ref(db, "users/" + userKey), {
      username: registerUserName,
      lid: "",

    }).then(() => {
      console.log("User data pushed successfully");
    })
      .then(() => {
        console.log("User data pushed successfully");
      })
      .catch((error) => {
        console.error("Error pushing data:", error);
      });

    window.location.href = "/login";
  } catch (error) {
    console.log(`There was an error creating account: ${error}`);
  }
}

export async function loginUser() {
  const loginEmail = (document.getElementById("email") as HTMLInputElement)
    .value;
  const loginPassword = (
    document.getElementById("password") as HTMLInputElement
  ).value;
  // const router = useRouter();

  // step 2: add error handling
  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    console.log("Successful logged in HERE!");

    window.location.href = "/dashboard";
    // router.push({pathname: '/dashboard'});
  } catch (error) {
    console.log(`There was an error: ${error}`);
    alert(
      "There was an error: Please make sure your Email and/or password are correct."
    );
  }
}

export async function monitorAuthState() {
  onAuthStateChanged(auth, (user) => {
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


// export async function googleLogin() {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider)
//   .then((result) => {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     const credential = GoogleAuthProvider.credentialFromResult(result);
//     const user = result.user;
//     const uid = user.uid;
//     const refUser = ref(db, 'users/');
//     const snapshot = await get(userRef);
//     alert("google loign successfully");
//     // window.location.href = '/dashboard';
//   }).catch((error) => {
//     // Handle Errors here.
//     // const errorCode = error.code;
//     // const errorMessage = error.message;
//     // The email of the user's account used.
//     // const email = error.customData.email;
//     // The AuthCredential type that was used.
//     // const credential = GoogleAuthProvider.credentialFromError(error);
//     // ...
//   });

// }

export async function googleLogin() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const user = result.user;
    const uid = user.uid;

    const userRef = ref(db, 'users');
    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      return 'snapshot not found';
    }
    let users = snapshot.val();
    let userIds = Object.keys(users);
    alert("Google login successful");
    if (!userIds.includes(uid)) {
      set(ref(db, 'users/' + uid), {
        username: user.displayName,
        lid: "",
  
      }).then(() => {
        console.log("User data pushed successfully");
      })
      .catch((error) => {
        console.error("Error pushing data:", error);
      });
    }
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(`Google login failed with error code ${errorCode} and message ${errorMessage}`);
    // ...
  }
}



export async function logoutUser() {
  await signOut(auth);
  alert("logged out");
  window.location.href = "/";
}

export async function resetPassword(
  changeEmailSentView: (newValue: boolean) => void
) {
  const email = (document.getElementById("email") as HTMLInputElement).value;

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      changeEmailSentView(true);
      console.log("Password reset email sent!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/missing-email") {
        alert("Please enter your email address");
      } else {
        alert(errorCode + errorMessage);
      }
    });
}

function getCurrTime() {
  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let currentTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return currentTime;
}
