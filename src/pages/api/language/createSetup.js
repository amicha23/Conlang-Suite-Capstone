import { db, storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, child, push, update } from "firebase/database";
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
    };

    const dict = {};

    let currentTime = getCurrTime();

    langData["createTime"] = currentTime;

    for (const field of dictFields) {
      dict[field] = { createTime: currentTime };
    }
    langData["dict"] = dict;

    const newLangKey = push(child(ref(db), "languages")).key;

    const coverURL = uploadCoverImg(data.coverBlob, newLangKey);

    data["coverURL"] = coverURL;

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
      return "Success";
    } else {
      return "No data available";
    }
  } catch (err) {
    return err;
  }
}

function uploadCoverImg(file, lid) {
  try {
    const metadata = {
      contentType: "image/jpg",
    };

    const storageRef = storeRef(storage, `coverImg/${lid}.jpg`);
    console.log(`coverImg/${lid}.jpg`)

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    console.log("Upload task started:", uploadTask);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload progress:", progress + "%");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.error("Upload error:", error);
      },
      () => {
        // Upload completed successfully, get download URL
        getDownloadURL(uploadTask.snapshot.storageRef).then((downloadURL) => {
          return downloadURL;
        });
      }
    );
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