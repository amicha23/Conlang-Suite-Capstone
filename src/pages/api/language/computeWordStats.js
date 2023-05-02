import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";


// show language stats, pass in lid
export default async function computeStat(data) {
  var lid = data.lid;
  const dictRef = ref(db, `languages/${lid}/dict`);

  function count_values(field, field_values) {
    const result = [];
    result.push(['type', 'count']);
    // Iterate through each word in the array
    for (let word of field_values) {
      // Extract the first letter of the word
      const firstLetter = word[0];

      // Check if an array element for this letter already exists in the result array
      const index = result.findIndex((arr) => arr[0] === firstLetter);

      if (index !== -1) {
        // If the element already exists, increment its count by 1
        result[index][1]++;
      } else {
        // If the element does not exist, create a new element with count 1
        result.push([firstLetter, 1]);
      }
    }
    return result;
  }

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      return "No data available";
    }
    const dict_data = snapshot.val();
    // 
    const field_names = Object.keys(dict_data);
    console.log(Array.isArray(field_names));

    var all_field_stats = [];
    for (const field of field_names) {
      var field_data = dict_data[field];

      const filtered_keys = Object.keys(field_data)
        .filter(key => key !== "createTime")
        .reduce((obj, key) => {
          obj[key] = field_data[key];
          return obj;
        }, {});
      
      const field_values = Object.values(filtered_keys);
      const field_stats = count_values(field, field_values);
      all_field_stats.push(field_stats);
      

    }
    console.log(all_field_stats);
    return [field_names, all_field_stats];
  } catch (err) {
    console.error(err);
    return err;
  }
}
