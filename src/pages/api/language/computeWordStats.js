import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, get } from "firebase/database";

<<<<<<< HEAD


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
=======

// show language stats, pass in lid
export default async function computeStat(data) {
  var lid = data.lid;
  const dictRef = ref(db, `languages/${lid}/dict`);

  function count_firstLetter_values(field_values) {
    const result = [];
    result.push(['first letter', 'count']);
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
  

  function count_word_values(field_values) {
    const result = [];
    result.push(['first letter', 'count']);
    // Iterate through each word in the array
    for (let word of field_values) {
      // Extract the first letter of the word
      const firstLetter = word;

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
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca

  try {
    const snapshot = await get(dictRef);
    if (!snapshot.exists()) {
      return "No data available";
    }
<<<<<<< HEAD
    const field_data = snapshot.val();

    console.log(field_data);

    const filtered_keys = Object.keys(field_data)
=======
    const dict_data = snapshot.val();
    // 
    const field_names = Object.keys(dict_data);
    console.log(Array.isArray(field_names));

    var firstLetterStats = [];
    var typeStats = [];

    for (const field of field_names) {
      var field_data = dict_data[field];

      const filtered_keys = Object.keys(field_data)
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca
        .filter(key => key !== "createTime")
        .reduce((obj, key) => {
          obj[key] = field_data[key];
          return obj;
<<<<<<< HEAD
        }, {}); 
    
    const field_values = Object.values(filtered_keys);
    const stats = {};
    const percentStats = {};
    const totalLength = field_values.length;
    
    for (const fieldVal of field_values) {
      var this_value = fieldVal;
=======
        }, {});
      
      const field_values = Object.values(filtered_keys);
      const field_fl_stats = count_firstLetter_values(field_values);
      const word_stats = count_word_values(field_values);

      firstLetterStats.push(field_fl_stats);
      typeStats.push(word_stats);
      
>>>>>>> cdc4def15418760d9457d4a75eed4aff3ee0ecca

    }
    return [firstLetterStats, typeStats];
  } catch (err) {
    console.error(err);
    return err;
  }
}
