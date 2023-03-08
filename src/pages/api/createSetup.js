import {db} from "../../../firebaseConfig/firebaseAdmin.js";
import { ref, child, push, update } from "firebase/database";


// To save dictionary setup data in the database
export default function handler(req, res) {
  console.log(req.body);
  try {
    const data = JSON.parse(req.body);
    const dictFields = String(data.dictFields).slice(0, String(data.dictFields).length);
    var _uid = 'user1';
    // var langData = {
    //   description: data.language_desc,
    //   dictionary_fields: dictFields,
    //   name: data.language_name,
    //   uid: _uid,
    // }
    var langData = {
      description: "testing lang1",
      dictionary_fields: '"Orthographic forms","Keystrokes for orthography","Head word","Inflected forms","Pronunciation","Proto-form","Politeness-register scale","English definition"',
      name: "testing lang1",
      uid: _uid,
      dict: "",
    }
    console.log("langData", langData)
    const newLangKey = push(child(ref(db),'languages')).key;

    const updates = {}
    updates['/languages/' + newLangKey] = langData;
    updates['/users/' + _uid + '/lid/'] = newLangKey;

    update(ref(db), updates).then(() => {
      console.log("Data pushed successfully");
    })
    .catch((error) => {
      console.error("Error pushing data:", error);
    });

    res.status(200).json("Sent dictionary data to the database!");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}
