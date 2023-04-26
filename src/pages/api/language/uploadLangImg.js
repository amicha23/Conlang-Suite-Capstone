import { storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import { ref, set } from "firebase/database";
import { db } from "../../../../firebaseConfig/firebaseAdmin.js";

export default async function uploadCoverImg(data) {
  try {
    const file = data.file;
    const lid = data.lid;

    // const lid = "-NTH0xS0MqSDgOiPg09p";

    const storageRef = ref(storage, `coverImg/${lid}.jpeg`);

    getMetadata(storageRef)
      .then((metadata) => {
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
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              set(ref(db, `language/${lid}/coverImg`), { downloadURL });
              return "Cover image upload success";
            });
          }
        );
      })
      .catch((e) => {
        return e;
      });
  } catch (e) {
    return e;
  }
}