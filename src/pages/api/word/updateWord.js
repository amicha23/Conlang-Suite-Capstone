import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, update } from "firebase/database";

export default async function updateWord(data) {
  console.log("HH ", data)
  var lid = data.lid;
  var wordData = data.data;
  var wid = wordData.id;
  try {
    let field = "";
    let value = "";
    for (var key of Object.keys(wordData)) {
      if (key != "id" && key != "key") {
        field = key;
        value = wordData[field];

        var updates = {};
        updates[`languages/${lid}/dict/${field}/${wid}`] = value;

        await update(ref(db), updates);
      }
    }
    return "Success";
  } catch (e) {
    return e;
  }
}