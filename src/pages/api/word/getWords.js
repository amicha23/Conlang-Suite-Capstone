import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  console.log("Request Language ID: ", data);
  const lid = data.lid; // TODO: replace with actual lid value
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }

    const dict = snapshot.val().dict;

    console.log("dict :>> ", dict);

    const firstCol = Object.values(dict)[0];
    console.log("firstCol :>> ", firstCol);

    let result = [];
    let word = {};

    if (Object.keys(firstCol).length === 1) {
      result = {};
      let cols = Object.keys(dict);
      cols.forEach((col) => {
        result[col] = "";
      });
      console.log("no word data");
      console.log("result :>> ", result);
      res.status(200).json([result]);
    } else {
      for (let id of Object.keys(firstCol)) {
        word = {}
        if (id === "createTime") continue;
        console.log('id :>> ', id);
        word = { id: id };
        for (let col of Object.keys(dict)) {
          console.log('col :>> ', col);
          console.log('word in :>> ', word);
          word[col] = dict[col][id];
        }
        console.log('word after :>> ', word);
        result.push(word);
      }

      console.log("result :>> ", result);

      res.status(200).json(result);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}