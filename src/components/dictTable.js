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
      let updateWordData = await updateWord({'lid' : queryParam, 'data' : newData[index] });

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


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [EditColumn, setEditColumn] = useState(null);
  const [prevEditColumn, setPrevEditColumn] = useState(null);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = async () => {
    console.log("New column header name: ", EditColumn)
    setIsEditModalOpen(false);

    let updateFieldData = await updateField({
      "currFieldName": prevEditColumn,
      'newFieldName': EditColumn.name,
      "lid": queryParam
    });

    if (updateFieldData === "Success") {
      console.log('updated column called :>> ', EditColumn.name);
      // await fetchData()
    } else {
      console.log("updated column failed ", updateFieldData)
    }
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
  };

  // Edit a column header
  const handleEditColumn = (dataIndex, close) => {
    setPrevEditColumn(dataIndex);
    close();
    showEditModal();
    // confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
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

    // let updateProFieldData = await updateWord({
    //   "currFieldName": prevProColumn,
    //   'newFieldName': proList.join(""),
    //   "lid": queryParam
    // });

    // if (updateProFieldData === "Success") {
    //   console.log('updated pronunciation called :>> ', proList.join(","));
    //   // await fetchData()
    // } else {
    //   console.log("updated pronunciation failed ", updateProFieldData)
    // }
    let id = prevProColumn.id
    console.log("EDIT THIS ID: ", id)
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
      } else {
        console.log("EDIT ROW: ", row)
        let addRowData = await addWord({
          'lid': queryParam,
          'wordData': proList.join("")
        });

        if (addRowData === "Success") {
          console.log('add row success');
        } else {
          console.log("add row failed ", addRowData)
        }
      }
      newData[index]['Pronunciation'] = proList.join("")
      console.log("EDIT THIS ROW IN THE DATABASE: ", newData[index]);
      let updateWordData = await updateWord({'lid' : queryParam, 'data' : newData[index]});

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

  // Edit a column header
  const handleProColumn = (dataIndex, close) => {
    setPrevProColumn(dataIndex);
    close();
    showProModal();
    // confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };






  // Delete a column
  const handleDeleteColumn = async (dataIndex) => {
    console.log("Data after delete column", data)
    let delParam = {
      "field": dataIndex,
      "lid": queryParam
    }
    let delFieldData = await deleteField(delParam);
    if (delFieldData === "Success") {
      console.log('added column called :>> ', dataIndex);
      // await fetchData()
    } else {
      console.log("Add column failed ", delFieldData)
    }
  };



  // Set column headers
  const [mergedColumns, setMergedColumns] = useState([])
  useEffect(() => {

    // Put delete and edit feature in column header
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Space>
            <Button
              onClick={() => handleEditColumn(dataIndex, close)}
              size="small"
              type="link"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDeleteColumn(dataIndex)}
              type="link"
              size="small"
            >
              Delete
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              Close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <MenuOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      render: (text) => text
    });


    let firstObject = data[0] || {};
    let cols = [];
    for (const colHeader in Object.keys(firstObject)) {
      if (Object.keys(firstObject)[colHeader] !== "id" &&  Object.keys(firstObject)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
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
          ...getColumnSearchProps(Object.keys(firstObject)[colHeader]),
          onFilter: (value, record) => {
            return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
          },
          render: (text, record) => {
            const editable = isEditing(record);
            return editable ? (
            <Button title="Click for IPA Keyboard" onClick={() => showProModal(text, record)}>{text}</Button>
            ):(text)
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
        ...getColumnSearchProps(Object.keys(firstObject)[colHeader]),
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
            <Popconfirm title="Are you sure delete this row?" onConfirm={async () => await handleDelete(record.id, record)}>
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
    setMergedColumns(mergedColumns)
  }, [data, editingKey])

  // if (filterColumn) {
  //   mergedColumns = mergedColumns.filter(column => column.dataIndex !== filterColumn);
  // }


  useEffect(() => {

    if (queryParam) {
      fetchData();
    }
  }, [queryParam]);

  // useEffect(() => {

  //   // if (data === []) {
  //     fetchData();
  //   // }
  // });

  async function fetchData() {
    let getWordData = await getLangData({'lid' : queryParam});

    if (getWordData) {
      // console.log('fetched data', getWordData['lang']['consonants'].split(","));
      // setData(getWordData)
      if (getWordData['lang']['consonants'] !== undefined && getWordData['lang']['vowels'] !== undefined) {
        setConsonantList(getWordData['lang']['consonants'].split(""))
        setVowelList(getWordData['lang']['vowels'].split(""))
      }
    } else {
      console.log("failed to fetch data ", getWordData)
    }

  }

  // useEffect(() => {
  //   if (queryParam) {
  //     const dictRef = ref(db, `languages/${queryParam}`);

  //     // Attach an event listener for real-time updates
  //     dictRef.on(`languages${queryParam}`, (snapshot) => {
  //       const fetchedData = snapshot.val();
  //       console.log("LOOOK", fetchData)
  //       setData(fetchedData);
  //     });

  //     // Detach the event listener when the component unmounts
  //     return () => dictRef.off();
  //   }
  // }, []);



  // Refresh data on database change
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

          const getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ close }) => (
              <div
                style={{
                  padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
              >
                <Space>
                  <Button
                    onClick={() => handleEditColumn(dataIndex, close)}
                    size="small"
                    type="link"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeleteColumn(dataIndex)}
                    type="link"
                    size="small"
                  >
                    Delete
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => {
                      close();
                    }}
                  >
                    Close
                  </Button>
                </Space>
              </div>
            ),
            filterIcon: (filtered) => (
              <MenuOutlined
                style={{
                  color: filtered ? '#1890ff' : undefined,
                }}
              />
            ),
            render: (text) => text
          });

          // let data =  [{'English definition': 't', 'testf': 't'}]


          let firstObject = data[0] || {};
          let cols = [];
          for (const colHeader in Object.keys(result)) {
            if (Object.keys(result)[colHeader] !== "id" &&  Object.keys(result)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
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
              ...getColumnSearchProps(Object.keys(result)[colHeader]),
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
                  <Popconfirm title="Are you sure delete this row?" onConfirm={async () => await handleDelete(record.id, record)}>
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

          // setData([]);
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
          console.log("SSSSSS", result)
          setData(result);
        }
      // }
      let getWordData = getLangData({'lid' : queryParam});
    })

    //cleanup function for when component is removed
    function cleanup() {
      unregisterFunction(); //call the unregister function
    }
    return cleanup; //effect hook callback returns the cleanup function
  }, [queryParam])


  // delete a row
  const handleDelete = async (key, record) => {
    console.log("DELETE THIS ROW FROM DATABASE: ", record);
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === record.id) {
          if (i === data.length - 1) {
            console.log("no")
            setData([]);
            continue
          } else {
            console.log("check", data[i + 1])
            edit(data[i + 1])
            break
          }
        }
      }

    let deleteWordData = await deleteWord({
      "data": record,
      "lid": queryParam
    })

    if (deleteWordData === "Success") {
      console.log('delete row success');
      // window.open(`/langTable?lid=`+ queryParam + `&lname=` + queryName, `_self`);
      // await fetchData()

      // edit(data[0])
      setEditingKey('');
      return
    } else {
      console.log("delete row failed ", deleteWordData)
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

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [AddColumn, setAddColumn] = useState(null);
  const showAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleAddOk = () => {
    setIsAddModalOpen(false);
    handleAddColumn()
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
  };

  // Add column
  const handleAddColumn = async () => {
    let addCol = await addField(
      {
        "fieldName": AddColumn.name,
        "lid": queryParam
      })
    if (addCol === "Success") {
      console.log('added column called :>> ', AddColumn.name);
      // await fetchData()
    } else {
      console.log("Add column failed ", addCol)
    }
  }

  // const MyTable = () => {
  //   // const updatedColumns = columns.filter(column => column.dataIndex !== 'column2');

  //   return <Table
  //   components={{
  //     body: {
  //       cell: EditableCell,
  //     },
  //   }}
  //   bordered
  //   dataSource={data}
  //   columns={mergedColumns}
  //   rowClassName="editable-row"
  //   pagination={{
  //     onChange: cancel,
  //   }}
  //   scroll={{x:950,y:"calc(100vh - 220px)" }}
  // />;
  // }
  const handleExport = async () => {
    console.log("OTHER", queryParam)
    const q = queryParam
    // ExportLangHtml(q);
    // Router.push({pathname: '/exportLangHtml', query: { lid: queryParam}})
    window.open(`/exportLangHtml?lid=`+ queryParam);
  };

  return (
    <div>
      <div id="lang-name-header" >
        <h1>{queryName}</h1>
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
        onClick={showAddModal}
        // onClick={handleAddColumn}
        type="primary"
        style={{
          marginBottom: 16,
          marginLeft: 8
        }}
      >
        + Add a column
      </Button>

      <Button
        onClick={handleExport}
        // onClick={handleAddColumn}
        type="primary"
        // href="/exportLangHtml" target="_blank"
        style={{
          marginBottom: 16,
          marginLeft: 8
        }}
      >
        + Export
      </Button>

      <Modal title="Add Column" open={isAddModalOpen} onOk={handleAddOk} onCancel={handleAddCancel}>
        <Input
          // value='Column Name'
          onChange={(e) => {
            setAddColumn(() => {
              return { name: e.target.value };
            });
          }}
        // onChange={(e) => {
        //     return e.target.value ;
        // }}
        />
      </Modal>



      <Modal title="Edit Column Header" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
        <Input
          // value='Column Name'
          onChange={(e) => {
            setEditColumn(() => {
              return { name: e.target.value };
            });
          }}
        // onChange={(e) => {
        //     return e.target.value ;
        // }}
        />
      </Modal>

      <Modal title="Edit Pronunciation" open={isProModalOpen} onOk={handleProOk} onCancel={handleProCancel}>

            <Input
              id="langVowelsID"
              placeholder="Vowels of Language"
              value={proList.join("")}
              onChange={(e) => setProList(e.target.value.split(""))}
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
          pagination={{
            onChange: cancel,
          }}
          scroll={{ x: 950}}
        />
      </Form>
    </div>
  );
};
export default DictionaryTable;
