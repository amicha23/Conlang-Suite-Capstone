import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, child, push, update } from "firebase/database";
import css from "styled-jsx/css";

export default async function handler(req, res) {
  console.log("req.body :>> ", JSON.parse(req.body));
  try {
    const data = JSON.parse(req.body);
    const dictFields = data.dictFields;
    console.log("dictFields :>> ", dictFields);
    var uid = data.uid; // TODO: include uid in req.body

    uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";

    const langData = {
      description: data.language_desc,
      // dictionary_fields: String(data.dictFields),
      name: data.language_name,
      uid: uid,
    };

    const dict = {};

    let date_ob = new Date();

    // current date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = date_ob.getHours();

    // current minutes
    let minutes = date_ob.getMinutes();

    // current seconds
    let seconds = date_ob.getSeconds();

    let currentTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    langData["createTime"] = currentTime;

    for (const field of dictFields) {
      dict[field] = { createTime: currentTime};
    }
    langData["dict"] = dict;

    const newLangKey = push(child(ref(db), "languages")).key;

    // Update user data with new language ID and name
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const lid = userData.lid || "";
      const lname = userData.lname || "";

      const newLid = lid ? `${lid},${newLangKey}` : newLangKey;
      const newLname = lname
        ? `${lname},${data.language_name}`
        : data.language_name;

      const updates = {};
      updates[`/languages/${newLangKey}`] = langData;
      updates[`/users/${uid}/lid`] = newLid;
      updates[`/users/${uid}/lname`] = newLname;

      await update(ref(db), updates);
      console.log("Data pushed successfully");
      res.status(200).json("Succes");
    } else {
      console.log("No data available");
      res.status(200).json({ response: "No data available" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "failed to load data" });
  }
}