import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, update } from "firebase/database";

export default async function handler(req, res) {
  var data = JSON.parse(req.body); // TODO
  data = {
    lid: "-NQ9AuH-xaR_k-NxzwcA",
    field: "Original form",
    wid: "-NQ9MOINxEjSe_Wwitd3",
    value: "sda"
  }
  const { lid, field, wid, value } = data;
  
  try {
    const wordRef = ref(db, `languages/${lid}/dict/${field}/${wid}`);
    const snapshot = await get(wordRef);

    if (!snapshot.exists()) {
      console.log(`Word with ID ${wid} not found in field ${field}`);
      return res.status(404).json({ error: `Word with ID ${wid} not found in field ${field}` });
    }

    await update(wordRef, { value: value });
    console.log(`Value of word ${wid} in field ${field} updated to ${value}`);
    return res.status(200).json({ message: `Value of word ${wid} in field ${field} updated to ${value}` });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
