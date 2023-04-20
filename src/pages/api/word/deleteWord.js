import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, remove } from "firebase/database";

export default async function deleteWord(data) {
  var lid = data.lid;
  var wid = data.data.id;
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return "No data available";
    }
    const dict = snapshot.val().dict;
    for (const field of Object.keys(dict)) {
      let wordRef = ref(db, `/languages/${lid}/dict/${field}/${wid}`);
      remove(wordRef);
    }
    return "Success";
  } catch (err) {
    return err;
  }
}