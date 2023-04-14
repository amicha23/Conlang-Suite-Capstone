import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, get, ref } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  var lid = data.lid;
  var wid = data.data.id;
  // lid = "-NQ9AuH-xaR_k-NxzwcA";
  // wid = "-NQ9JXBV_saywGNGQuci";
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }
    const dict = snapshot.val().dict;

    const updates = {};
    for (const field of Object.keys(dict)) {
      if (dict[field][wid]) {
        updates[
          `/languages/${lid}/dict/${field}/${wid}/del_status`
        ] = 1;
      }
    }

    update(ref(db), updates);
    console.log("del_status updated");
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update del_status" });
  }
}
