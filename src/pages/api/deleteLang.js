import { update, ref, get, set } from "firebase/database";
import { db } from "../../../firebaseConfig/firebaseAdmin.js";

export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO
  var lid = data.lid;
  lid = "-NTI9g4l17bcQqpzegwZ";
  var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";

  try {
    const langRef = ref(db, `languages/${lid}`);
    const snapshot = await get(langRef);

    if (!snapshot.exists()) {
      console.log(`lang with id ${lid} does not exist`);
      return res.status(404).json({ error: `Lang '${lid}' does not exist` });
    }
    const langData = snapshot.val();
    const lname = langData.name;

    // update user's data
    const userRef = ref(db, `users/${uid}`);
    const snapshot_user = await get(userRef);
    if (snapshot_user.exists()) {
      const userData = snapshot_user.val();
      var user_lid = userData.lid;
      var user_lname = userData.lname;

      function replaceSubstringIfFound(str, subStr, replacement) {
        if (str.includes(subStr + ",")) {
          str = str.replace(subStr + ",", replacement);
        } else if (str.includes("," + subStr)) {
          str = str.replace("," + subStr, replacement);
        } else {
          str = str.replace(subStr, replacement);
        }
        return str;
      }

      user_lid = replaceSubstringIfFound(user_lid, lid, "");
      user_lname = replaceSubstringIfFound(user_lname, lname, "");
    }

    const updates = {};
    updates[`languages/${lid}`] = null;
    updates[`users/${uid}/lid`] = user_lid;
    updates[`users/${uid}/lname`] = user_lname;

    set(ref(db, `deleteRecord/${uid}/${lid}`), { langData });

    await update(ref(db), updates);
    console.log("Language deleted successfully");
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
}
