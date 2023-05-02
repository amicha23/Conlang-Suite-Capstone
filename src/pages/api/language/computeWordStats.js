import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";


// show language stats, pass in lid
export default async function computeStat(data) {
  var lid = data.lid;
  const dictRef = ref(db, `languages/${lid}/dict`);

  function count_values(field, field_values) {
    // Create a dictionary to store the count of words starting with each alphabet
    const alphaCount = {};
    // Iterate over each word in the array and update the count of that alphabet in the dictionary
    field_values.forEach(word => {
      var alpha = word[0];
      if (field === ('Orthographic forms')) {
        alpha = word;
      }
      alphaCount[alpha] = (alphaCount[alpha] || 0) + 1;
    });

    // Convert the dictionary to a list of lists and sort it based on the alphabet
    const result = Object.entries(alphaCount)
      .map(([k, v]) => [k, String(v)])
      .sort();
    result.unshift(['type', 'count']);
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
