import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";
import { query, orderByChild, equalTo } from "firebase/database";


export default function handler(req, res) {
  const dictName = "testing 1";
  try {
    const dictRef = ref(db, "languages");
    const dictQuery = query(dictRef, orderByChild("name"), equalTo(dictName));
    get(dictQuery).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dictionaryFields = Object.values(data)[0].dictionary_fields;
        console.log("dictionaryFields :>> ", dictionaryFields);
        res
          .status(200)
          .json({ response: "successfully query dictionary fields" });
      } else {
        console.log("No data available");
        res.status(200).json({ response: "No data available" });
      }
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
