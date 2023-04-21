import { useState, useEffect } from "react";
import getLangData from "./api/language/getLangData";
import { Table } from "antd";
import { query } from "firebase/database";
import Router from "next/router";

export default function ExportLangHtml() {
  // console.log("QQQQQQQQQQ", queryParam)
  // const q = queryParam
  const [data, setData] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams) {
      async function fetchData() {
        let queryParam = searchParams.get('lid').replace(/\s+/g, '')
        try {
          const result = await getLangData({ lid: queryParam }); //TODO: change to queryParam
          setData(result);
        } catch (error) {
          console.error(error);
          setData("error");
        }
      }
      fetchData();
  }
  }, []);

  function reformatDict(dict) {
    console.log("DICT", dict)
    const firstCol = Object.values(dict)[0];

    let result = [];
    let word = {};
    if (Object.keys(firstCol).length === 1) {
      result = {};
      let cols = Object.keys(dict);
      cols.forEach((col) => {
        result[col] = "";
      });
      return [result];
    } else {
      for (let id of Object.keys(firstCol)) {
        word = {};
        if (id === "createTime") continue;
        for (let col of Object.keys(dict)) {
          console.log("COL: ", col)
            word[col] = dict[col][id];
        }
        result.push(word);
      }
    }
    return result;
  }

  if (data === null) {
    return <div>Loading...</div>;
  } else if (data === "error") {
    return <div>Failed to export</div>;
  } else {
    console.log("TEST DATA", data)
    const lname = data.name;
    const langDesc = data.description;
    const createTime = data.createTime;
    const dict = data.dict;
    const dictTableData = reformatDict(dict);

    const columns = Object.keys(dictTableData[0]).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
    }));

    return (
      <div>
        <h1>{lname}</h1>
        <p>Language Description: {langDesc}</p>
        <p>Create time: {createTime}</p>
        <Table
          columns={columns}
          dataSource={dictTableData}
          pagination={{ pageSize: dictTableData.length }}
        />
      </div>
    );
  }
}