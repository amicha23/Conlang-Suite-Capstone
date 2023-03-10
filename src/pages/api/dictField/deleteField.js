import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, ref } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  var lid = data.lid;
  lid = "-NQ9AuH-xaR_k-NxzwcA"
  var field = data.field;
  field = "English form"
  const dictRef = ref(db, `languages/${lid}/dict/${field}`);

  try {
    await update(dictRef, { del_status: 1 });
    console.log(`Successfully updated del_status of ${field} to 1`);
    res.status(200).json({ message: "Successfully updated dictionary entry" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
