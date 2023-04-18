import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, get, ref, remove } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  var lid = data.lid;
  var wid = data.data.id;
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }
    const dict = snapshot.val().dict;
    for (const field of Object.keys(dict)) {
      if (dict[field][wid]) {
        let wordRef = ref(db, `/languages/${lid}/dict/${field}/${wid}`);
        remove(wordRef);
      }
    }

    console.log(`word with lid ${lid} deleted`);
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete" });
  }
}