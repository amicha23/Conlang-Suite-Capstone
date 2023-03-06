import db from "../../../firebaseConfig/firebaseConfig.js";

// To save dictionary setup data in the database
export default function handler(req, res) {
  console.log(req.body);
  try {
    console.log("tried pushing new data to database");
    const data = JSON.parse(req.body);
    const dictFields = String(data.dictFields).slice(0, String(data.dictFields).length);
    var _uid = 'user1';
    var langData = {
      description: data.language_desc,
      dictionary_fields: dictFields,
      name: data.language_name,
      uid: _uid,
    }
    console.log("langData", langData)
    const newLangKey = db.ref().child('languages').push().key;

    const updates = {}
    updates['/languages/' + newLangKey] = langData;
    updates['/users/' + _uid + '/lid/'] = newLangKey;
    console.log("updates", updates)

    db.ref().update(updates);

    console.log("Sent dictionary data to the database!");
    res.status(200).json("Sent dictionary data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
