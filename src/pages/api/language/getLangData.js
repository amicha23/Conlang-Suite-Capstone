import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";

export default async function getLangData(data) {
  try {
    var lid = data.lid;
    const dictRef = ref(db, `languages/${lid}`);

    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      return "No data available";
    }

    const dict = snapshot.val();
    return dict;
  } catch (error) {
    return error;
  }
}