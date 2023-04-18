import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, update } from "firebase/database";

export default async function handler(req, res) {
  var data = JSON.parse(req.body); // TODO
  console.log("EDIT DATA ", data)
  // data = {
  //   lid: "-NQ9AuH-xaR_k-NxzwcA",
  //   currFieldName: "Original",
  //   newFieldName: "Original form",
  // }
  const lid = data.lid;
  const currFieldName = data.currFieldName;
  const newFieldName = data.newFieldName;

  try {
    const dictRef = ref(db, `languages/${lid}/dict/${currFieldName}`);
    const snapshot = await get(dictRef);

    if (!snapshot.exists()) {
      console.log(`Field '${currFieldName}' does not exist`);
      return res.status(404).json({ error: `Field '${currFieldName}' does not exist` });
    }

    const fieldData = snapshot.val();
    const updates = {};
    updates[`languages/${lid}/dict/${newFieldName}`] = fieldData;
    updates[`languages/${lid}/dict/${currFieldName}`] = null;

    await update(ref(db), updates);

    console.log(`Field '${currFieldName}' renamed to '${newFieldName}'`);
    res.status(200).json({ message: `Field '${currFieldName}' renamed to '${newFieldName}'` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
