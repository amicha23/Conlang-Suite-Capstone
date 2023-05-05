import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, update } from "firebase/database";

export default async function updateLangNameAndDesc(data) {
  const lid = data.lid;
  const newLangName = data.newLangName;
  const newLangDesc = data.newLangDesc;

  try {
    const updates = {};
    updates[`languages/${lid}/name`] = newLangName;
    updates[`languages/${lid}/description`] = newLangDesc;

    await update(ref(db), updates);
    return "Success";
  } catch (e) {
    return e;
  }
}
