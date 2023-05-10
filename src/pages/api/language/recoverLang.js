import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, child, push, update } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";

export default async function recoverLang(lid) {
  try {
    // let uid = sessionStorage.getItem("uid");
    let uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";
    console.log("lid :>> ", lid);
    const langRef = ref(db, `deleteRecord/${uid}/${lid}`);
    const snapshot = await get(langRef);

    if (!snapshot.exists()) {
      return "No data available";
    }

    let langData = snapshot.val().langData;

    let currentTime = getCurrTime();
    langData["createTime"] = currentTime;

    delete langData["deleteTime"];

    const storage = getStorage();
    const desertRef = storageRef(storage, `coverImg/default.jpg`);
    langData["coverURL"] = await getDownloadURL(desertRef);

    console.log("langData :>> ", langData);

    const newLangKey = push(child(ref(db), "languages")).key;

    // Update user data with new language ID and name
    const userRef = ref(db, `users/${uid}`);
    const userSnapshot = await get(userRef);
    if (userSnapshot.exists()) {
      const userData = userSnapshot.val();
      const lidList = userData.lid || "";

      const newLid = lidList ? `${lidList},${newLangKey}` : newLangKey;

      const updates = {};
      updates[`/languages/${newLangKey}`] = langData;
      updates[`/users/${uid}/lid`] = newLid;
      updates[`/deleteRecord/${uid}/${lid}`] = null;

      await update(ref(db), updates);
      console.log("updated :>> ");
      return "Success";
    } else {
      return "Recover failed";
    }
  } catch (err) {
    console.log("error :>> ", err);
    return err;
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
