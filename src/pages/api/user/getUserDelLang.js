import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function getUserDelLang() {
  try {
    let uid = sessionStorage.getItem("uid");
    // let uid = "123";
    const userRef = ref(db, `deleteRecord/${uid}`);
    const snapshot = await get(userRef);

    console.log("running getUserDelLang");
    if (snapshot.exists()) {
      const data = snapshot.val();
      return data;
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
}
