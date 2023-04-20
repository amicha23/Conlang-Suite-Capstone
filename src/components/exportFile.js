import getLangData from '../pages/api/language/getLangData'
import { Button, Form, Input, InputNumber, Typography, Popconfirm, Table, Modal, Space } from "antd";

export default async function exportHTML(queryParam) {
  let data = await getLangData({ lid: queryParam })
  console.log("DDDDDDDDd", data)
    if (typeof(data) !== String) {
        const lname = data.name;
        const langDesc = data.description;
        const dict = data.dict;
        var dictTableData = reformatDict(dict);

        const columns = Object.keys(dictTableData[0]).map((key) => ({
          title: key,
          dataIndex: key,
          key: key,
        }));

        return (
          <div>
            <h1>{lname}</h1>
            <p>{langDesc}</p>
            <Table columns={columns} dataSource={dictTableData} />
          </div>
        );

    } else {
      console.log("Error: ", data);
    }
}

function reformatDict(dict) {
  const firstCol = Object.values(dict)[0];

  let result = [];
  let word = {};
  if (Object.keys(firstCol).length === 1) {
    result = {};
    let cols = Object.keys(dict);
    cols.forEach((col) => {
      result[col] = "";
    });
    return [result]
  } else {
    for (let id of Object.keys(firstCol)) {
      word = {};
      if (id === "createTime") continue;
      word = { id: id };
      for (let col of Object.keys(dict)) {
        word[col] = dict[col][id];
      }
      result.push(word);
    }
  }
  return result
}