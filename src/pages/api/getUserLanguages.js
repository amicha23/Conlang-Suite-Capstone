import db from "../../../firebaseConfig/firebaseConfig.js";
import { get, query, orderByChild, orderByValue, orderByKey, limitToLast, equalTo } from "firebase/database"

export default async function handler(req, res) {
  try {
    // *** CHANGE THIS TO MATCH USERID OF CURRENTLY LOGGED IN USER ***
    let responseData =[];
    const user = "user1"
    let userData = await db.ref()
    .child("languages")
    .orderByChild('uid')
    .equalTo(user)
    .once('value', function(s) {
      let data = Object.values(s.val()); // returns all data aligning to the given uid
      responseData = data;
    }, function(error) {
      if(error) console.error(error);
    })

    res.status(200).json(responseData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}