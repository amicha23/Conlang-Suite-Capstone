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

    const columns = Object.keys(dict).filter(key =>
      Object.values(dict[key]).some(value =>
        typeof value === "object" && value !== null &&
        value.hasOwnProperty("del_status") &&
        value.hasOwnProperty("value") &&
        dict[key].hasOwnProperty("del_status") && dict[key]["del_status"] === 0
      )
    );
    console.log(columns)
    let result = [];
    if (columns === undefined || columns.length == 0) {
        result = {};
        let cols = Object.keys(dict)
        console.log(cols)
        cols.forEach(element => {
          result[element] = ''
        });
        console.log(result)
        res.status(200).json([result]);
        return
    } else {
      let i = 0 // Set iterable key value for each row
    // columns.forEach(column => {
      Object.entries(dict[columns[0]])
        .filter(([key, value]) => value.del_status === 0)
        .forEach(([key, value]) => {
          const entry = {
            id: key,
            key: i
          };
          i++;
          entry[columns[0]] = value.value;
          columns.filter(c => c !== columns[0]).forEach(otherColumn => {
            const otherValue = dict[otherColumn][key]?.value;
            if (otherValue !== undefined && otherValue !== null) {
              entry[otherColumn] = otherValue;
            }
          });
          result.push(entry);
        });
    // });
      }


    console.log(result);
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}




    // // Just return the column headers
    // if (Object.keys(result).length === 0) {
    //   let cols = Object.keys(dict)
    //   console.log(cols)
    //   cols.forEach(element => {
    //     result[element] = []
    //   });
    //   res.status(200).json(result);
    //   return
    // }