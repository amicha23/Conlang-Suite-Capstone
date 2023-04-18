import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { update, get, ref, remove } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  console.log("DEL DATA", data)
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
    console.log("DCTTTTTT", dict)
    for (const field of Object.keys(dict)) {
      console.log("FIEDL", dict[field]['-NTLRuZ8Ixeivi4R-l4r'])
      // if (dict[field][wid]) {
        console.log("TESTTTTTTTTTT", )
        let wordRef = ref(db, `/languages/${lid}/dict/${field}/${wid}`);
        remove(wordRef);
      // }
    }

    console.log(`word with lid ${wid} deleted`);
    res.status(200).json("Success");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete" });
  }
}