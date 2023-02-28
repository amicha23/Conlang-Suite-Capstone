import db from "../../../firebaseConfig/firebaseConfig.js";

// Register userdata
export default function handler(req, res) {
  // Return the request body in JSON
  // content included in res:
  // lname
  // email
  // password

  console.log(JSON.parse(req.body));
  try {
    console.log("tried pushing user data to database");

    var userData = {
      username: "user1",
      email: "test@dict",
      password: "1",
    }
    const newUserKey = db.ref().child('users').push().key;

    const updates = {}
    updates['/users/' + newUserKey] = userData;

    db.ref().update(updates);

    console.log("Sent user data to the database!");
    res.status(200).json("Sent user data to the database!");
  } catch (err) {
    res.status(500).json({ error: "failed to load data" });
  }
}

