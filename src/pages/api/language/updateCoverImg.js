import { db, storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

import { update, ref as dbref } from "firebase/database";

export default async function updateCoverImg(data) {
  console.log("DATAAAAA ", data);
  var lid = data.lid;

  var coverImg = data.coverImg;
  const storageRef = ref(storage, `coverImg/${lid}.jpg`);

  // upload new img
  if (coverImg) {
    const metadata = {
      contentType: "image/jpg",
    };

    const uploadTask = uploadBytesResumable(storageRef, coverImg, metadata);
    console.log("Upload task started:", uploadTask);

    // Wait for the upload task to complete
    await uploadTask;

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("downloadURL :>> ", downloadURL);
    return downloadURL;
  } else {
    // delete existed old img
    await deleteObject(storageRef)
    const storage = getStorage();
    const desertRef = ref(storage, `coverImg/default.jpg`);
    const downloadURL = await getDownloadURL(desertRef);
    const updates = {};
    updates[`languages/${lid}/coverURL`] = downloadURL;
    await update(dbref(db), updates);
    console.log("downloadURL(default) :>> ", downloadURL);
    return downloadURL;
  }
}