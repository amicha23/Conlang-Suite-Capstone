import db from "../../../firebaseConfig/firebaseConfig.js";

// To save dictionary setup data in the database
export default function handler(req, res) {
  // Return the request body in JSONs
  // console.log(JSON.parse(req.body));
  console.log(req);
  try {    
    // testing data
    dictFields = JSON.parse(req.body)

    const updates = {}
    updates['/languages/' + newLangKey] = langData;
    updates['/users/' + uid + '/lid/'] = newLangKey;

    db.ref().update(updates);

    res.status(200).json("Sent dictionary data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}
