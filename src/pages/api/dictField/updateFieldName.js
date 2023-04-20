import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, update } from "firebase/database";

export default async function updateField(data) {
  const lid = data.lid;
  const currFieldName = data.currFieldName;
  const newFieldName = data.newFieldName;

  try {
    const dictRef = ref(db, `languages/${lid}/dict/${currFieldName}`);
    const snapshot = await get(dictRef);

    if (!snapshot.exists()) {
      return `Field '${currFieldName}' does not exist`;
    }

    const fieldData = snapshot.val();
    const updates = {};
    updates[`languages/${lid}/dict/${newFieldName}`] = fieldData;
    updates[`languages/${lid}/dict/${currFieldName}`] = null;

    await update(ref(db), updates);
    return "Success";
  } catch (e) {
    return e;
  }
}