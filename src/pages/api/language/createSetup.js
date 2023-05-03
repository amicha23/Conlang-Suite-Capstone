import { db, storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, child, push, update } from "firebase/database";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";

import {
  ref as storeRef,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";

export default async function createSetup(data) {
  try {
    const dictFields = data.dictFields;
    var uid = data.uid; // TODO: include uid in req.body

    // uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";

    const langData = {
      description: data.language_desc,
      name: data.language_name,
      uid: uid,
      vowels: data.vowels,
      consonants: data.consonants,
    };

    const dict = {};

    let currentTime = getCurrTime();

    langData["createTime"] = currentTime;

    for (const field of dictFields) {
      dict[field] = { createTime: currentTime };
    }
    langData["dict"] = dict;

    const newLangKey = push(child(ref(db), "languages")).key;

    const storage = getStorage();
    const desertRef = storageRef(storage, `coverImg/default.jpg`);
    var coverURL = await getDownloadURL(desertRef);

    if (data.coverFile) {
      console.log(
        "data.coverFile.originFileObj :>> ",
        data.coverFile.originFileObj
      );
      coverURL = await uploadCoverImg(
        data.coverFile.originFileObj,
        newLangKey
      );
    }

    langData["coverURL"] = coverURL;

    // Update user data with new language ID and name
    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      const lid = userData.lid || "";

      const newLid = lid ? `${lid},${newLangKey}` : newLangKey;

      const updates = {};
      updates[`/languages/${newLangKey}`] = langData;
      updates[`/users/${uid}/lid`] = newLid;

      await update(ref(db), updates);
      return "Success";
    } else {
      return "No data available";
    }
  } catch (err) {
    return err;
  }
}

async function uploadCoverImg(file, lid) {
  try {
    const metadata = {
      contentType: "image/jpg",
    };

    const storageRef = storeRef(storage, `coverImg/${lid}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    console.log("Upload task started:", uploadTask);

    // Wait for the upload task to complete
    await uploadTask;

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("downloadURL :>> ", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
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