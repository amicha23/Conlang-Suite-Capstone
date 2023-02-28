import db from "../../../firebaseConfig/firebaseConfig.js";

// To save dictionary setup data in the database
export default function handler(req, res) {
  // Return the request body in JSONs
  console.log(JSON.parse(req.body));
  try {
    // testing data
    var uid = "user1";
    var langData = {
      description: "testing10",
      dictionary_fields: "das1, d2",
      name: "test dict 10",
      uid: "1",
    };

    const newLangKey = db.ref().child("languages").push().key;
    console.log("user language list");
    var langList;
    var newLangList;
    db.ref()
      .child("users")
      .child(uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          langList = snapshot.val().lid;
          newLangList = langList + "," + newLangKey;
          const updates = {};
          updates["/languages/" + newLangKey] = langData;
          updates["/users/" + uid + "/lid/"] = newLangList;
          console.log(newLangList);
          return db.ref().update(updates);
        } else {
          console.log("No data available");
        }
      })
      .then(() => {
        console.log("Sent dictionary data to the database!");
        res.status(200).json("Sent dictionary data to the database!");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "failed to load data" });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
