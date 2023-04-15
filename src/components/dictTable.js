// Create a table to hold all dictionary information

import { Button, Form, Input, InputNumber, Typography, Popconfirm, Table } from "antd";
import { set } from "firebase/database";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

//icons
import {
  SearchOutlined,
  EditTwoTone,
  EditOutlined,
  DeleteOutlined,
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
const DictionaryTable = () => {
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
        onFilter: (value, record) => {
          return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
        }
      }
    cols.push(col);
    // }
  }

  // const columns = [
  //   {
  //     title: 'name',
  //     dataIndex: 'name',
  //     width: '25%',
  //     editable: true,
  //   },
  //   {
  //     title: 'age',
  //     dataIndex: 'age',
  //     width: '15%',
  //     editable: true,
  //   },
  //   {
  //     title: 'address',
  //     dataIndex: 'address',
  //     width: '40%',
  //     editable: true,
  //   },
  cols.push(
    {
      title: 'operation',
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
    fetch(`api/word/getWords`, {
      method: "POST",
      body: JSON.stringify({ lid: "-NQ9AuH-xaR_k-NxzwcA" }),
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
      });
  }, []);

  const handleDelete = async (key, record) => {
    console.log("FFFFFFFF", data)
    const newData = [];
    data.forEach((item) => {
      console.log("item", item.id)
      if (item.id !== record.id) {
        newData.push(item);
      }
    });
      console.log("HHHHHHHHHHHHH", newData)
    setData(newData);

    console.log("DELETE THIS ROW FROM DATABASE: ", record);
    await fetch(`api/word/deleteWord`, {
      method: "POST",
      body: JSON.stringify(
        {"data": record,
        "lid": JSON.stringify({ lid: "-NQ9AuH-xaR_k-NxzwcA" })
        })
      })
      .then(resp => {
        // console.log("Deleted word ", resp.json())
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
      />
    </Form>
    </div>
  );
};
export default DictionaryTable;
