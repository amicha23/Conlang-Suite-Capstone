import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";

// show language stats, pass in lid and column names
export default async function computeStat(data) {
  const lid = "-NTH0xS0MqSDgOiPg09p";
  const field = "newcol";

  const fieldRef = ref(db, `languages/${lid}/dict/${field}`);

  try {
    const snapshot = await get(fieldRef);
    if (!snapshot.exists()) {
      return "No data available";
    }
    const field_data = snapshot.val();
    console.log(field_data);
    const field_values = Object.values(field_data);
    const stats = {};
    const percentStats = {};
    const totalLength = field_values.length;

    for (const fieldVal of field_values) {
      var this_value = fieldVal;

      if (field === "English definition" || field === "Orthographic form") {
        this_value = fieldVal[0];
      }
      if (stats[this_value]) {
        stats[this_value]++;
        percentStats[this_value] = stats[this_value] / totalLength;
      } else {
        stats[this_value] = 1;
        percentStats[this_value] = 1 / totalLength;
      }
    }

    console.log(stats);
    console.log(percentStats);
    return percentStats;
  } catch (err) {
    console.error(err);
    return err;
  }
}