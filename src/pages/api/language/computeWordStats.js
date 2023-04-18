import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";

// show language stats, pass in lid and column names
export default async function handler(req, res) {
  const data = JSON.parse(req.body); // TODO: include lid and field in req.body

  // const lid = data.lid;
  const lid = "-NTH0xS0MqSDgOiPg09p";
  // var uid = "OUnW07Np3VNFduMOCX1V1bvvsd22";
  // var field = data.field;
  const field = "newcol";
  // e.g. English definition or Orthographic forms
  

  const fieldRef = ref(db, `languages/${lid}/dict/${field}`);
  
  try {
    const snapshot = await get(fieldRef);
    if (!snapshot.exists()) {
      console.log("No data available");
      return res.status(200).json({ response: "No data available" });
    }
    const field_data = snapshot.val();
    console.log(field_data);
    const field_values = Object.values(field_data);
    const stats = {};
    const percentStats = {};
    const totalLength = field_values.length;

    

    for (const fieldVal of field_values) {
      var this_value = fieldVal;

      
      if (field === 'English definition' || field === 'Orthographic form') {
        // count and group by first letter
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

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
  }
}