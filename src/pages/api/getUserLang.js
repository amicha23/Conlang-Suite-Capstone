import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function getUserLang(data) {
  try {
    // var { uid } = data.uid; // TODO: include uid in req.body, uncomment when able to do this
    var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);

    let lCovers = [];
    if (snapshot.exists()) {
      const data = snapshot.val();
      const { lid, lname } = data;
      let _lid = lid.split(',');
      for (let id of _lid) {
        const langRef = ref(db, `languages/${id}`);

        const snapshot = await get(langRef);
        if (!snapshot.exists()) {
          return "No data available";
        }
    
        const langCoverUrl = snapshot.val().coverURL;
        lCovers.push(langCoverUrl);
      }
      
      return { languageIDs: lid, languageNames: lname, languageCovers: lCovers };
    } else {
      return "No data available";
    }
  } catch (error) {
    return error;
  }
}
