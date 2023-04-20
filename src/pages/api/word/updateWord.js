import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, update } from "firebase/database";

export default async function handler(req, res) {
  var data = JSON.parse(req.body);
  console.log("data :>> ", data);
  var lid = data.lid;
  var wordData = data.data;
  var wid = wordData.id;
  try {
    console.log("Object.keys(wordData) :>> ", Object.keys(wordData));
    let field = ""; // Declare field variable with a default value
    let value = ""; // Declare value variable with a default value
    for (var key of Object.keys(wordData)) {
      if (key != "id" && key != "key") {
        field = key; // Update field variable
        value = wordData[field]; // Update value variable
        console.log("field :>> ", field);

        var updates = {};
        updates[`languages/${lid}/dict/${field}/${wid}`] = value;

        await update(ref(db), updates);

        console.log(
          `Value of word ${wid} in field ${field} updated to ${value}`
        );
      }
    }
    return res.status(200).json({
      message: `Value of word ${wid} updated to ${value}`,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}