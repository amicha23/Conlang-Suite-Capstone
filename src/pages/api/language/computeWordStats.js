import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";



// show language stats, pass in lid and column names
export default async function computeStat() {
  const lid = "-NTadEqCzrA2EZmbUEs4";
  const field = "2";


  const fieldRef = ref(db, `languages/${lid}/dict/${field}`);
  // const data = {
  //   "-NTWnNkh1pArdcl4cgBz": {
  //     "createTime": "2023-04-20 20:13:35",
  //     "description": "language1 description",
  //     "dict": {
  //       "English definition": {
  //         "-NTzrir7bLSYpirHRi9r": "abc",
  //         "-NTpZLGeu_nhSbj-5cq_": "cdba",
  //         "createTime": "2023-04-20 20:13:35"
  //       },
  //       "aa": {
  //         "-NTzrir7bLSYpirHRi9r": "fekl",
  //         "-NTpZLGeu_nhSbj-5cq_": "thso",
  //         "createTime": "2023-04-26 15:54:0"
  //       },
  //       "testf": {
  //         "-NTzrir7bLSYpirHRi9r": "thap",
  //         "-NTpZLGeu_nhSbj-5cq_": "theiso",
  //         "createTime": "2023-04-23 2:33:50"
  //       }
  //     },
  //     "name": "language1",
  //     "uid": "OUnW07Np3VNFduMOCX1V1bvvsd22"
  //   }
  // }

  try {
    const snapshot = await get(fieldRef);
    if (!snapshot.exists()) {
      return "No data available";
    }
    const field_data = snapshot.val();

    console.log(field_data);

    const filtered_keys = Object.keys(field_data)
        .filter(key => key !== "createTime")
        .reduce((obj, key) => {
          obj[key] = field_data[key];
          return obj;
        }, {}); 
    
    const field_values = Object.values(filtered_keys);
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