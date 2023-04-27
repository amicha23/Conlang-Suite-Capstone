import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";

export default async function getLangData(data) {
  try {
    var lid = data.lid;
    const langRef = ref(db, `languages/${lid}`);

    const snapshot = await get(langRef);
    if (!snapshot.exists()) {
      return "No data available";
    }

    const lang = snapshot.val();

    const dictHeaders = Object.keys(lang.dict);
    const result = [lang, dictHeaders]
    // console.log('result[0] :>> ', result[0]);
    return result;
  } catch (error) {
    return error;
  }
}