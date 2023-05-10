import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, ref, remove } from "firebase/database";

export default async function deleteField(data) {
  var lid = data.lid;
  var field = data.field;
  const dictRef = ref(db, `languages/${lid}/dict/${field}`);

  try {
    remove(dictRef);
    return "Success";
  } catch (e) {
    return e;
  }
}