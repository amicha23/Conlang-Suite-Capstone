import { update, ref, get, set } from "firebase/database";
import { db } from "../../../../firebaseConfig/firebaseAdmin.js";

export default async function deleteLang(data) {
  var lid = data.lid;
  // lid = "-NTI9g4l17bcQqpzegwZ";
  var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";

  try {
    const langRef = ref(db, `languages/${lid}`);
    const snapshot = await get(langRef);

    if (!snapshot.exists()) {
      return `Lang '${lid}' does not exist`;
    }
    const langData = snapshot.val();

    // update user's data
    const userRef = ref(db, `users/${uid}`);
    const snapshot_user = await get(userRef);
    if (snapshot_user.exists()) {
      const userData = snapshot_user.val();
      var user_lid = userData.lid;

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
    }

    const updates = {};
    updates[`languages/${lid}`] = null;
    updates[`users/${uid}/lid`] = user_lid;

    set(ref(db, `deleteRecord/${uid}/${lid}`), { langData });

    await update(ref(db), updates);
    return "Success"
  } catch (e) {
    return e;
  }
}
