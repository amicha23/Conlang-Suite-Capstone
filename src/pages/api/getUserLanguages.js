import db from "../../../firebaseConfig/firebaseConfig.js";
import { get, query, orderByChild, orderByValue, orderByKey, limitToLast, equalTo } from "firebase/database"

export default function handler(req, res) {
  try {
    // const dictName = req.body.name;
    // *** CHANGE THIS TO MATCH USERID OF CURRENTLY LOGGED IN USER ***
    const userId = 'user1';
    const dbRef = db.ref();
    //const languagesSnapshot = await get(query(dbRef, [orderByChild("uid"), equalTo(userId)]));
    // db.ref()
    //   .child("languages")

      console.log(db.ref()
      .child("languages")
      .orderByChild("uid")
      .equalTo(userId)
      .get()) 
      // .equalTo(userId)
      // .get()
      // .then((snapshot) => {
      //   if (snapshot.exists()) {
      //     const data = snapshot.val();
      //     console.log("SnapshotData: " + data);
      //     return data;
      //   } else {
      //     console.log("No data available");
      //   }
      // });
    console.log("TEST ENTRY");
    //console.log("Snapshot: " + languagesSnapshot);
    //const languages = languagesSnapshot.val();
    //console.log("View Languages: " + languages);
    // Not sure this will work

    res.status(200).json("Found All User Languages");
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
