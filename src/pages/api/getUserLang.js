import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function handler(req, res) {
  try {
    // var { uid } = JSON.parse(req.body); // TODO: include uid in req.body, uncomment when able to do this
    var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22"
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const { lid, lname } = data;
      console.log({ languageIDs: lid, languageNames: lname });
      res.status(200).json({ languageIDs: lid, languageNames: lname });
    } else {
      console.log("No data available");
      res.status(200).json({ response: "No data available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to load data" });
  }
}
