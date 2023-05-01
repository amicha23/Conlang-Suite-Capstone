import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, update } from "firebase/database";

export default async function updateLangNameAndDesc(data) {
  const lid = data.lid;

  try {
    const updates = {};
    updates[`languages/${lid}/name`] = data.newLangName;
    updates[`languages/${lid}/description`] = data.newLangDesc;
    updates[`languages/${lid}/consonants`] = data.consonants;
    updates[`languages/${lid}/vowels`] = data.vowels;
    updates[`languages/${lid}/coverImg`] = data.coverURL;

    await update(ref(db), updates);
    return "Success";
  } catch (e) {
    return e;
  }
}