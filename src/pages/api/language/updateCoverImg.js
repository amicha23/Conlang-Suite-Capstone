import { db, storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default async function updateCoverImg(data) {
  console.log("DATAAAAA ", data)
  var lid = data.lid;

  var coverImg = data.coverImg;

  // upload new img
  if (coverImg) {
    const metadata = {
      contentType: "image/jpg",
    };

    const storageRef = ref(storage, `coverImg/${lid}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, coverImg, metadata);
    console.log("Upload task started:", uploadTask);

    // Wait for the upload task to complete
    await uploadTask;

    // Get the download URL for the uploaded file
    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
    console.log("downloadURL :>> ", downloadURL);
    return downloadURL;
  } else {
    const metadata = {
      contentType: "image/jpg",
    };
    console.log("TEST NULL")
    // delete existed old img
    // const storage = getStorage();
    const desertRef = ref(storage, `coverImg/default.jpg`);
    const storageRef = ref(storage, `coverImg/${lid}.jpg`);

    const uploadTask = uploadBytesResumable(storageRef, `coverImg/default.jpg`, metadata);
    console.log("Upload task started:", uploadTask);

    // Wait for the upload task to complete
    await uploadTask;
    const downloadURL = await getDownloadURL(desertRef);
    console.log("downloadURL(default) :>> ", downloadURL);
    return downloadURL;
  }
}