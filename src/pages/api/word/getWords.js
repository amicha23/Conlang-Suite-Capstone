import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);
  console.log("Request Language ID: ", data)
  var lid = data.lid; // TODO: replace with actual lid value
  // lid = "-NQ9AuH-xaR_k-NxzwcA"
  const dictRef = ref(db, `languages/${lid}`);

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }

    const dict = snapshot.val().dict;

    const columns = Object.keys(dict).filter(key =>
      Object.values(dict[key]).some(value =>
        typeof value === "object" && value !== null &&
        value.hasOwnProperty("del_status") &&
        value.hasOwnProperty("value") &&
        dict[key].hasOwnProperty("del_status") && dict[key]["del_status"] === 0
      )
    );

    const result = {};
    columns.forEach(column => {
      result[column] = Object.entries(dict[column])
        .filter(([key, value]) => value.del_status === 0)
        .map(([key, value]) => ({ [key]: value.value }));
    });

    // Just return the column headers
    if (Object.keys(result).length === 0) {
      let cols = Object.keys(dict)
      console.log(cols)
      cols.forEach(element => {
        result[element] = []
      });
      res.status(200).json(result);
      return
    }

    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
