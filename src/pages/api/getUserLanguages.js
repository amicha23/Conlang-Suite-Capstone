import db from "../../../firebaseConfig/firebaseConfig.js";
import { get, query, orderByChild, orderByValue, orderByKey, limitToLast, equalTo } from "firebase/database"

export default async function handler(req, res) {
  try {
    // const dictName = req.body.name;
    // *** CHANGE THIS TO MATCH USERID OF CURRENTLY LOGGED IN USER ***
    // const userId = 'user1';
    const dbRef = db.ref();
    //const languagesSnapshot = await get(query(dbRef, [orderByChild("uid"), equalTo(userId)]));
    // db.ref()
    //   .child("languages")
    let responseData =[];
    const user = "user1"
    let userData = await db.ref()
    .child("languages")
    .orderByChild('uid')
    .equalTo(user)
    .once('value', function(s) {
      // console.log(JSON.stringify(s.val(), null, '  '));
      // console.log(s.val())
      let data = Object.values(s.val()); // returns all data aligning to the given uid
      console.log("Data: ", data)
      // console.log("Description: ", data.description)
      // console.log("Dictionary Fields: ", data.dictionary_fields)
      // console.log("Languange Name: ", data.name)
      // console.log("uid: ", data.uid)
      responseData = data
    }, function(error) {
      if(error) console.error(error);
    })

    // console.log("test: ", userData)
    console.log("HERE")


    console.log("TEST ENTRY");
    console.log(responseData)
    //console.log("Snapshot: " + languagesSnapshot);
    //const languages = languagesSnapshot.val();
    //console.log("View Languages: " + languages);
    // Not sure this will work

    res.status(200).json(responseData);
  } catch (e) {
    res.status(500).json({ error: e });
  }
}
