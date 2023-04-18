import { storage } from "../../../../firebaseConfig/firebaseAdmin.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getMetadata,
} from "firebase/storage";
import fs from "fs"; // Import the fs module

export default async function handler(req, res) {
  try {
    const file = req.body.file;
    const lid = req.body.lid;

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
              console.log("File available at:", downloadURL);
              res.status(200).json("Cover image upload success");
            });
          }
        );
      })
      .catch((e) => {
        console.error("Error uploading image:", e);
        res.status(500).json("Cover image upload failed");
      });
  } catch (e) {
    console.error("Error uploading image:", e);
    res.status(500).json("Cover image upload failed");
  }
}
