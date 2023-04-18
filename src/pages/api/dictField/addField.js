import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, update } from "firebase/database";

export default async function handler(req, res) {
  const data = JSON.parse(req.body);

  const { lid, fieldName } = data;

  const dictRef = ref(db, `languages/${lid}`);

  const date_ob = new Date();

  const date = ("0" + date_ob.getDate()).slice(-2);
  const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  const year = date_ob.getFullYear();
  const hours = date_ob.getHours();
  const minutes = date_ob.getMinutes();
  const seconds = date_ob.getSeconds();

  const currentTime = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }

    const dict = snapshot.val().dict;

    console.log("dict :>> ", dict);

    const firstCol = Object.values(dict)[0];
    const fieldData = {};
    for (let id of Object.keys(firstCol)) {
      if (id === "createTime") {
        fieldData[id] = currentTime;
      }
      fieldData[id] = "";
    }

    await update(ref(db, `languages/${lid}/dict/${fieldName}`), { ...fieldData });

    console.log("Language deleted successfully");
    return res.status(200).json({ message: "Language deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e });
  }
}