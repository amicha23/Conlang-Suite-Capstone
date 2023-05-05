import { db } from "../../../firebaseConfig/firebaseAdmin.js";
import { get, ref, remove } from "firebase/database";
import schedule from "node-schedule";

import dotenv from "dotenv";
dotenv.config();

async function cleanHistory() {
  try {
    const recordRef = ref(db, `deleteRecord`);
    const snapshot = await get(recordRef);

    if (!snapshot.exists()) {
      console.log("No history data ------- ");
      return "No delete history";
    }

    const data = snapshot.val();
    console.log("data :>> ", data);

    for (let uid in data) {
      for (let lid in data[uid]) {
        var lang = data[uid][lid].langData;
        console.log("lang :>> ", lang);
        var deleteTime = lang.deleteTime;
        console.log("deleteTime :>> ", deleteTime);
        if (isPast(deleteTime)) {
          const recordToDeleteRef = ref(db, `deleteRecord/${uid}/${lid}`);
          await remove(recordToDeleteRef);
          console.log(`Record ${uid}/${lid} deleted`);
        }
      }
    }
  } catch (err) {
    console.log("err :>> ", err);
  }
}

function isPast(time) {
  // Get the current time
  let now = new Date();

  // Parse the input time string into a Date object
  let timeDate = new Date(time);

  // Check if the input time is at least 30 days in the past
  return (now - timeDate) >= (30 * 24 * 60 * 60 * 1000);
}

function startScheduler() {
  console.log('Starting scheduler... --------------------------------');
  // Schedule the cleanHistory function to run every day at midnight
  const job = schedule.scheduleJob("0 0 * * *", cleanHistory);
  return job;
}

startScheduler();

export { startScheduler };