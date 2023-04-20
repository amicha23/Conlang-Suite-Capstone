import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function getUserLang(data) {
  try {
    // var { uid } = data.uid; // TODO: include uid in req.body, uncomment when able to do this
    var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const { lid, lname } = data;
      return { languageIDs: lid, languageNames: lname };
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
}