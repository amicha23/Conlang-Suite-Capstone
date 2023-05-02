// Create a table to hold all dictionary information

import { Button, Form, Input, InputNumber, Typography, Popconfirm, Table, Modal, Space } from "antd";
import { query, set } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import Router from "next/router";
import { useLocation } from 'react-router-dom';
import ExportLangHtml from "../pages/exportLangHtml";
import addField from "../pages/api/dictField/addField";
import deleteField from "../pages/api/dictField/deleteField";
import updateField from "../pages/api/dictField/updateFieldName";
import addWord from "../pages/api/word/addWord";
import deleteWord from "../pages/api/word/deleteWord";
import getWords from "../pages/api/word/getWords";
import updateWord from "../pages/api/word/updateWord";
import IPAKeyboard from "./IPAKeyboard";
import vowels from "../data/vowels.json";
import consonants from "../data/consonants.json";
import getLangData from "../pages/api/language/getLangData";

import { update, ref, get, remove, child, push, onValue, off } from "firebase/database";
import { db } from "../../firebaseConfig/firebaseAdmin.js";
import firebase from 'firebase/app';
import 'firebase/database';

//icons
import {
  SearchOutlined,
  EditTwoTone,
  EditOutlined,
  DeleteOutlined,
  MenuOutlined
} from "@ant-design/icons";
import "../app/globals.css";
const { Search } = Input;


const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const DictionaryTable = ({ queryParam, setQueryParam, queryName, setQueryName }) => {
  // const [queryParam, setQueryParam] = useState('');
  // const [queryName, setQueryName] = useState('');
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [filterColumn, setFilterColumn] = useState('');
  const [consonantList, setConsonantList] = useState([]);
  const [vowelList, setVowelList] = useState([]);
  const [proList, setProList] = useState([]);
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [sorter, setSorter] = useState({});
  const isEditing = (record) => record.id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        // setData(newData);
        // await fetchData()
        setEditingKey('');
      } else {
        // newData.push(row);
        console.log("EDUT tow", row)
        let addRowData = await addWord({
          'lid': queryParam,
          'wordData': row
        });

        if (addRowData === "Success") {
          console.log('add row success');
          // await fetchData()
        } else {
          console.log("add row failed ", addRowData)
        }
        // setData(newData);
        // await fetchData()
        setEditingKey('');
      }

      console.log("EDIT THIS ROW IN THE DATABASE: ", newData[index]);
      let updateWordData = await updateWord({ 'lid': queryParam, 'data': newData[index] });

      if (updateWordData === "Success") {
        console.log('updated row success :>> ', newData[index]);
        // await fetchData()
      } else {
        console.log("updated row failed ", updateWordData)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // Pronunciation Edits
  const [isProModalOpen, setIsproModalOpen] = useState(false);
  const [ProColumn, setProColumn] = useState(null);
  const [prevProColumn, setPrevProColumn] = useState(null);
  const showProModal = (text, record) => {
    // setPrevProColumn(text);
    console.log("VOWE", vowelList)
    setPrevProColumn(record);
    setIsproModalOpen(true);
  };

  const handleProOk = async () => {
    setIsproModalOpen(false);

    let id = prevProColumn.id
    console.log("EDIT THIS ID: ", id)
    try {
      const row = form;
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
      } else {
        console.log("EDIT ROW: ", row)
        let addRowData = await addWord({
          'lid': queryParam,
          'wordData': proList
        });

        if (addRowData === "Success") {
          console.log('add row success');
        } else {
          console.log("add row failed ", addRowData)
        }
      }
      newData[index]['Pronunciation'] = proList
      console.log("EDIT THIS ROW IN THE DATABASE: ", newData[index]);
      let updateWordData = await updateWord({ 'lid': queryParam, 'data': newData[index] });

      if (updateWordData === "Success") {
        console.log('updated row success :>> ', newData[index]);
      } else {
        console.log("updated row failed ", updateWordData)
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleProCancel = () => {
    setIsproModalOpen(false);
  };

  // Edit a pronunciation header
  const handleProColumn = (dataIndex, close) => {
    setPrevProColumn(dataIndex);
    close();
    showProModal();
  };



  // Set column headers
  const [mergedColumns, setMergedColumns] = useState([])
  useEffect(() => {
    let firstObject = data[0] || {};
    let cols = [];
    for (const colHeader in Object.keys(firstObject)) {
      if (Object.keys(firstObject)[colHeader] !== "id" && Object.keys(firstObject)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
        console.log(Object.keys(firstObject)[colHeader])
        if (Object.keys(firstObject)[colHeader] === "Pronunciation") {
          console.log("Pronunciation Column Here")
          const col = {
            title: Object.keys(firstObject)[colHeader],
            dataIndex: Object.keys(firstObject)[colHeader],
            key: Object.keys(firstObject)[colHeader],
            width: '10rem',
            // minWidth: '10rem',
            // editable: true,
            sorter: (a, b) => {
              console.log(typeof (a[Object.keys(firstObject)[colHeader]]), typeof (b[Object.keys(firstObject)[colHeader]]))
              if (typeof (a[Object.keys(firstObject)[colHeader]]) === 'number' && typeof (b[Object.keys(firstObject)[colHeader]]) === 'number') {
                return a[Object.keys(firstObject)[colHeader]] - b[Object.keys(firstObject)[colHeader]];
              } else {
                return String(a[Object.keys(firstObject)[colHeader]]).localeCompare(String(b[Object.keys(firstObject)[colHeader]]))
              }
            },
            sortDirections: ['descend', 'ascend'],
            // ...getColumnSearchProps(Object.keys(firstObject)[colHeader]),
            onFilter: (value, record) => {
              return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
            },
            render: (text, record) => {
              const editable = isEditing(record);
              return editable ? (
                <Button title="Click for IPA Keyboard" onClick={() => showProModal(text, record)}>{text}</Button>
              ) : (text)
            }
          }
          cols.push(col);
        } else {
          const col = {
            title: Object.keys(firstObject)[colHeader],
            dataIndex: Object.keys(firstObject)[colHeader],
            key: Object.keys(firstObject)[colHeader],
            width: '10rem',
            // minWidth: '10rem',
            editable: true,
            sorter: (a, b) => {
              console.log(typeof (a[Object.keys(firstObject)[colHeader]]), typeof (b[Object.keys(firstObject)[colHeader]]))
              if (typeof (a[Object.keys(firstObject)[colHeader]]) === 'number' && typeof (b[Object.keys(firstObject)[colHeader]]) === 'number') {
                return a[Object.keys(firstObject)[colHeader]] - b[Object.keys(firstObject)[colHeader]];
              } else {
                return String(a[Object.keys(firstObject)[colHeader]]).localeCompare(String(b[Object.keys(firstObject)[colHeader]]))
              }
            },
            sortDirections: ['descend', 'ascend'],
            onFilter: (value, record) => {
              return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
            }
          }
          cols.push(col);
        }

      }
    }
    // if (data.length > 0) {
    cols.push(
      {
        title: '',
        dataIndex: 'operation',
        width: '10rem',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <div>
              <span>
                <Typography.Link
                  onClick={() => save(record.id)}
                  style={{
                    marginRight: 8,
                  }}
                >
                  Save
                </Typography.Link>
                <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                  <a>Cancel</a>
                </Popconfirm>
              </span>
            </div>
          ) : (
            <div style={{ minWidth: '200%' }}>
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                Edit
              </Typography.Link>
              <Popconfirm title="Are you sure delete this row?" okButtonProps={{loading: confirmLoading}} onConfirm={async () => await handleDelete(record.id, record)}>
                    <a><DeleteOutlined style={{ marginLeft: 12 }} /> </a>
              </Popconfirm>
            </div>
          );

        },

      })

    let mergedColumns = cols.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    setMergedColumns(mergedColumns)
  }, [data, editingKey])

  useEffect(() => {

    if (queryParam) {
      fetchData();
    }
  }, [queryParam]);

  async function fetchData() {
    let getWordData = await getLangData({ 'lid': queryParam });

    if (getWordData) {
      if (getWordData['lang']['consonants'] !== undefined && getWordData['lang']['vowels'] !== undefined) {
        setConsonantList(getWordData['lang']['consonants'].split(""))
        setVowelList(getWordData['lang']['vowels'].split(""))
      }
    } else {
      console.log("failed to fetch data ", getWordData)
    }
  }




  // Refresh data and columns on database change
  useEffect(() => {
    const dictRef = ref(db, `languages/${queryParam}/dict`);

    //returns a function that will "unregister" (turn off) the listener
    const unregisterFunction = onValue(dictRef, (snapshot) => {
      const dict = snapshot.val();
      console.log("LOOK DATA ", dict)
      // setData(dict)


      // if (queryParam) {
      const firstCol = Object.values(dict)[0];
      let result = [];
      let word = {};

      if (Object.keys(firstCol).length === 1) {
        result = {};
        let dcols = Object.keys(dict);
        dcols.forEach((col) => {
          result[col] = '';
        });

        let firstObject = data[0] || {};
        let cols = [];
        for (const colHeader in Object.keys(result)) {
          if (Object.keys(result)[colHeader] !== "id" && Object.keys(result)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
            console.log(Object.keys(result)[colHeader])
            const col = {
              title: Object.keys(result)[colHeader],
              dataIndex: Object.keys(result)[colHeader],
              key: Object.keys(result)[colHeader],
              width: '10rem',
              // minWidth: '10rem',
              editable: true,
              sorter: (a, b) => {
                console.log(typeof (a[Object.keys(result)[colHeader]]), typeof (b[Object.keys(result)[colHeader]]))
                if (typeof (a[Object.keys(result)[colHeader]]) === 'number' && typeof (b[Object.keys(result)[colHeader]]) === 'number') {
                  return a[Object.keys(result)[colHeader]] - b[Object.keys(result)[colHeader]];
                } else {
                  return String(a[Object.keys(result)[colHeader]]).localeCompare(String(b[Object.keys(result)[colHeader]]))
                }
              },
              sortDirections: ['descend', 'ascend'],
              // ...getColumnSearchProps(Object.keys(result)[colHeader]),
              onFilter: (value, record) => {
                return String(record[Object.keys(result)[colHeader]]).includes(value);
              }
            }
            cols.push(col);
          }
        }
        // if (data.length > 0) {
        cols.push(
          {
            title: '',
            dataIndex: 'operation',
            width: '10rem',
            render: (_, record) => {
              const editable = isEditing(record);
              return editable ? (
                <div>
                  <span>
                    <Typography.Link
                      onClick={() => save(record.id)}
                      style={{
                        marginRight: 8,
                      }}
                    >
                      Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                </div>
              ) : (
                <div style={{ minWidth: '200%' }}>
                  <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                    Edit
                  </Typography.Link>
                  <Popconfirm title="Are you sure delete this row?" okButtonProps={{loading: confirmLoading}} onConfirm={async () => await handleDelete(record.id, record)}>
                    <a><DeleteOutlined style={{ marginLeft: 12 }} /> </a>
                  </Popconfirm>
                </div>
              );

            },

          })
        // }

        let mergedColumns = cols.map((col) => {
          if (!col.editable) {
            return col;
          }
          return {
            ...col,
            onCell: (record) => ({
              record,
              inputType: col.dataIndex === 'age' ? 'number' : 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
        });
        console.log("TRY COLUMNS", mergedColumns)
        setMergedColumns(mergedColumns)

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
        setData(result);
      }
      let getWordData = getLangData({ 'lid': queryParam });
    })

    //cleanup function for when component is removed
    function cleanup() {
      unregisterFunction(); //call the unregister function
    }
    return cleanup; //effect hook callback returns the cleanup function
  }, [queryParam])

  const [confirmLoading, setConfirmLoading] = useState(false);
  // delete a row
  const handleDelete = async (key, record) => {
    console.log("DELETE THIS ROW FROM DATABASE: ", record);
    console.log("Rows remaining", data.length)
    if (data.length - 1 === 0) {
      setData([]);
    }
    setConfirmLoading(true);
    // setSorter({})
    // for (let i = 0; i < data.length; i++) {
    //   if (data[i].id === record.id) {
    //     if (i === data.length - 1) {
    //       console.log("no rows")
    //       // setData([]);
    //       continue
    //     }
    //     // } else {
    //     //   console.log("check", data[i + 1])
    //     //   edit(data[i + 1])
    //     //   break
    //     // }
    //   }
    // }

    let deleteWordData = await deleteWord({
      "data": record,
      "lid": queryParam
    }).then((data) => {return data})

    if (deleteWordData === "Success") {
      console.log('delete row success');
      // window.open(`/langTable?lid=`+ queryParam + `&lname=` + queryName, `_self`);
      // await fetchData()

      // edit(data[0])
      // setEditingKey('');
      // return
      setConfirmLoading(false);
    } else {
      console.log("delete row failed ", deleteWordData)
      setConfirmLoading(false);
    }
    return
  };

  // Add a row
  const handleAdd = async () => {
    let newData = {};
    for (const colHeader in mergedColumns) {
      if (mergedColumns[colHeader].title === "" || mergedColumns[colHeader].title === "id") {
        continue;
      } else {
        newData[mergedColumns[colHeader].title] = ``;
      }
    }
    console.log("ADD ROW", newData);
    let addRowData = await addWord({
      'lid': queryParam,
      'wordData': newData
    });

    if (addRowData === "Success") {
      console.log('add row success');
      // await fetchData()
    } else {
      console.log("add row failed ", addRowData)
    }
  };

  const handleExport = async () => {
    window.open(`/exportLangHtml?lid=` + queryParam);
  };

  return (
    <div>
      <div id="lang-name-header" >
        <h1>{String(queryName)}</h1>
      </div>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        + Add a row
      </Button>


      <Button
        onClick={handleExport}
        type="primary"
        style={{
          marginBottom: 16,
          marginLeft: 8
        }}
      >
        + Export
      </Button>

      <Modal title="Edit Pronunciation" open={isProModalOpen} onOk={handleProOk} onCancel={handleProCancel} footer={[<Button key="back" onClick={handleProCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleProOk}>
            Save
          </Button>,]}>

        <Input
          id="langVowelsID"
          placeholder="Vowels of Language"
          value={proList}
          onChange={(e) => setProList(e.target.value)}
        />

        <p>Consonants of Language</p>
        <IPAKeyboard
          list={consonantList}
          soundList={consonantList}
          setSoundList={setProList}
          curList={proList}
          noDup={false}
        />

        <p>Vowels of Language</p>
        <IPAKeyboard
          list={vowelList}
          soundList={vowelList}
          setSoundList={setProList}
          curList={proList}
          noDup={false}
        />
      </Modal>


      <Form form={form} component={false}>

        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          onChange={(sorter) => setSorter(sorter)}
          pagination={{
            onChange: cancel,
          }}
          scroll={{ x: 950 }}
        />
      </Form>
    </div>
  );
};
export default DictionaryTable;
