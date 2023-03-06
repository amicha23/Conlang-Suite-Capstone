import db from "../../../firebaseConfig/firebaseConfig.js";

export default function handler(req, res) {
  console.log(JSON.parse(req.body));
  try {
    // const dictName = req.body.name;
    const dictName = "test dict 2";
    db.ref()
      .child("languages")
      .orderByChild("name")
      .equalTo(dictName)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const dictionaryFields = Object.values(data)[0].dictionary_fields;
          console.log('dictionaryFields :>> ', dictionaryFields);
          return dictionaryFields
        } else {
          console.log("No data available");
        }
      });

    res
      .status(200)
      .json({ response: "successfully query dictionary fields" });
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
