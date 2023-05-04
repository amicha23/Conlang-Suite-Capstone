import { update, ref, get, set } from "firebase/database";
import { db } from "../../../../firebaseConfig/firebaseAdmin.js";

export default async function deleteLang(data) {
  var lid = data.lid;
  // lid = "-NTI9g4l17bcQqpzegwZ";
  // var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";
  let uid = sessionStorage.getItem("uid");

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

    const currentTime = getCurrTime();
    langData["deleteTime"] = currentTime;

    set(ref(db, `deleteRecord/${uid}/${lid}`), { langData });

    await update(ref(db), updates);
    return "Success";
  } catch (e) {
    return e;
  }
}

function getCurrTime() {
  let date_ob = new Date();

  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  let currentTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

  return currentTime;
}
