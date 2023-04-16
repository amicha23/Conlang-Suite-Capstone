// Create a table to hold all dictionary information

import { Button, Form, Input, InputNumber, Typography, Popconfirm, Table } from "antd";
import { query, set } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useLocation } from 'react-router-dom';

//icons
import {
  SearchOutlined,
  EditTwoTone,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "../app/globals.css";
import { convertCompilerOptionsFromJson } from "typescript";
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
const DictionaryTable = () => {
  const [queryParam, setQueryParam] = useState('');
  const [queryName, setQueryName] = useState('');
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      name: '',
      age: '',
      address: '',
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey('');
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }

      console.log("EDIT THIS ROW IN THE DATABASE: ", newData[index]);
      await fetch(`api/word/updateWord`, {
        method: "POST",
        body: JSON.stringify(
          {"data": newData[index],
          "lid": queryParam
          })
        })
        .then(resp => {
          return resp.json();
        })
        .catch(err => {
          console.log(err);
        });
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  let firstObject = data[0] || {};
  let cols = [];
  for (const colHeader in Object.keys(firstObject)) {
    // if (Object.keys(firstObject)[colHeader] !== "id" && Object.keys(firstObject)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
    console.log(Object.keys(firstObject)[colHeader])
    const col = {
        title: Object.keys(firstObject)[colHeader],
        dataIndex: Object.keys(firstObject)[colHeader],
        key: Object.keys(firstObject)[colHeader],
        width: '20%',
        editable: true,
        sorter: (a, b) => a[Object.keys(firstObject)[colHeader]].localeCompare(b[Object.keys(firstObject)[colHeader]]),
        sortDirections: ['descend', 'ascend'],
        onFilter: (value, record) => {
          return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
        }
      }
    cols.push(col);
    // }
  }
  cols.push(
    {
      title: '',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <div>
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
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
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
            <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.key, record)}>
              <a><DeleteOutlined style={{ marginLeft: 12 }}/> </a>
            </Popconfirm>
          </div>
        );

      },
    })

  const mergedColumns = cols.map((col) => {
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



  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const queryParam = searchParams.get('lid');
    const queryName = searchParams.get('lname');
    if (queryParam) {
      setQueryParam(queryParam.replace(/\s+/g, ''));
      setQueryName(queryName);
      console.log("QUERY ", queryParam.replace(/\s+/g, ''));
    }
  }, []);

  useEffect(() => {
    if (queryParam) {
      fetch(`api/word/getWords`, {
        method: "POST",
        body: JSON.stringify({ 'lid': queryParam }),
      })
        .then((response) => response.json())
        .then((data) => {
          const newData = data.map((item) => {
            const newItem = {};
            for (const key in item) {
              newItem[key] = item[key];
            }
            return newItem;
          });
          console.log("READ DATA: ", data)
          setData(newData);
        })
        .catch(error => {
          console.log("Failed to fetch data: ", error);
        });
    }
  }, [queryParam]);

  const handleDelete = async (key, record) => {
    console.log("FFFFFFFF", data)
    const newData = [];
    data.forEach((item) => {
      console.log("item", item.id)
      if (item.id !== record.id) {
        newData.push(item);
      }
    });
    setData(newData);

    console.log("DELETE THIS ROW FROM DATABASE: ", record);
    await fetch(`api/word/deleteWord`, {
      method: "POST",
      body: JSON.stringify(
        {"data": record,
        "lid": queryParam
        })
      })
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log(err);
      });


  };

  const handleAdd = async () => {
    let newData = {}
    // console.log("HHHHH",defaultColumns)
    // for (const colHeader in Object.keys(defaultColumns[0])) {
    //   console.log("HERE", colHeader)
    //   newData[Object.keys(defaultColumns[0])[colHeader].title] = `Insert data here`;
    // }


    let newword = await fetch(`api/word/addWord`, {
      method: "POST",
      body: JSON.stringify(
        {"data": newData
        })
      })
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log(err);
      });

      console.log("Added Word to Database: ", newword);


      newData.id= newword.newWordKey;
      newData.key = data.length;
      setData([...data, newData]);
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
        scroll={{x:950,y:"calc(100vh - 220px)" }}
      />
    </Form>
    </div>
  );
};
export default DictionaryTable;
