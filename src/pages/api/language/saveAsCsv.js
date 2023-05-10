import { db } from "../../../../firebaseConfig/firebaseAdmin.js";
import { ref, update } from "firebase/database";

export default async function saveAsCsv(data) {
  var lid = data.lid;
  var wordData = data.data;
  const name = data.name;
  const columns = data.columns;
  let csvCols = []
  for (let i = 0; i < columns.length - 1; i++) {
    csvCols.push(columns[i].title)
  }

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += csvCols.join(",") + '\r\n';

  for (var i = 0; i < wordData.length; i++) {
      var row = (Object.values(wordData[i]).slice(1)).join(",");
      csvContent += row + '\r\n';
  }

  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${name}.csv`);
  document.body.appendChild(link); // Required for FF

link.click(); // This will download the data file named "my_data.csv".

}