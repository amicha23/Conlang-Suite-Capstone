import db from "../../../firebaseConfig/firebaseConfig.js";

// To save dictionary setup data in the database
export default function handler(req, res) {
  // Return the request body in JSON
  // TODO: 
  // content included in res:
  // uid
  // description
  // dictionary fields
  // language name

  console.log(JSON.parse(req.body));
  try {
    console.log("tried pushing new data to database");
    var uid = 'user1';
    var langData = {
      description: "testing1",
      dictionary_fields: "das1, d2",
      name: "test dict 1",
      uid: "1",
    }
    const newLangKey = db.ref().child('languages').push().key;

    const updates = {}
    updates['/languages/' + newLangKey] = langData;
    updates['/users/' + uid + '/lid/'] = newLangKey;

    db.ref().update(updates);

    console.log("Sent dictionary data to the database!");
    res.status(200).json("Sent dictionary data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
