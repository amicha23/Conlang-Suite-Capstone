import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, child, push, update } from "firebase/database";

// To save dictionary setup data in the database
export default function handler(req, res) {
  console.log("req.body :>> ", JSON.parse(req.body));
  var data = JSON.parse(req.body); // TODO: include words and lid in req.body
  data = {
    lid: "-NQ9AuH-xaR_k-NxzwcA",
    word: {
      "Original form": "safrbgh",
      "English form": "people",
      "Parts of speech": "noun",
    },
  };
  const lid = data.lid;
  const wordData = data.word;

  try {
    const newWordKey = push(child(ref(db), `languages/${lid}/dict`)).key;
    console.log("newWordKey :>> ", newWordKey);
    const updates = {};
    for (const key of Object.keys(wordData)) {
      console.log("key :>> ", key);
      updates[`/languages/${lid}/dict/${key}/${newWordKey}`] = {value : wordData[key], del_status: 0};
    }

    update(ref(db), updates);
    console.log("data pushed :>> ", newWordKey, wordData);
    res.status(200).json({"newWordData": wordData, "newWordKey": newWordKey});
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
