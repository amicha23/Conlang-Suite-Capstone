import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function getWords(data) {
  const lid = data.lid;
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      return "No data available";
    }
    const dict = snapshot.val().dict;
    const firstCol = Object.values(dict)[0];

    let result = [];
    let word = {};

    if (Object.keys(firstCol).length === 1) {
      result = {};
      let cols = Object.keys(dict);
      cols.forEach((col) => {
        result[col] = "";
      });
      return [result];
    } else {
      for (let id of Object.keys(firstCol)) {
        word = {};
        if (id === "createTime") continue;
        word = { id: id };
        for (let col of Object.keys(dict)) {
          word[col] = dict[col][id];
        }
        result.push(word);
      }
      return result;
    }
  } catch (e) {
    return "Error: " + e;
  }
}