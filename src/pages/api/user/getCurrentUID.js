import { auth } from "../../../../firebaseConfig/firebaseAdmin.js";
import { onAuthStateChanged } from 'firebase/auth';

export default async function getCurrentUid() {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("uid :>> ", uid);
        resolve(uid);
      } else {
        console.log("No user is signed in.");
        resolve(null);
      }
    });
  });
}