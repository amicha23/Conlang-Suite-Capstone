import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref } from "firebase/database";


export default function handler(req, res) {
  try {
    const _lid = "-NQ7OKjfHiyMPxLR2cXb"
    const dictRef = ref(db, `languages/${_lid}`);
    get(dictRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const dictionaryFields = data.dictionary_fields;
        res
          .status(200)
          .json({ response: "successfully query dictionary fields", data: dictionaryFields });
      } else {
        console.log("No data available");
        res.status(200).json({ response: "No data available" });
      }
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
