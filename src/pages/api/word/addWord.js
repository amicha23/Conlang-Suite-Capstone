import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, child, push, update } from "firebase/database";

// To save dictionary setup data in the database
export default function addWord(data) {
  const lid = data.lid;
  const wordData = data.wordData;
  try {
    const newWordKey = push(child(ref(db), `languages/${lid}/dict`)).key;
    const updates = {};
    for (let key of Object.keys(wordData)) {
      updates[`/languages/${lid}/dict/${key}/${newWordKey}`] = wordData[key];
    }
    update(ref(db), updates);
    return "Success";
  } catch (err) {
    return err;
  }
}