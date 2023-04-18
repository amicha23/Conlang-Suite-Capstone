// Create a table to hold all dictionary information

import { Button, Form, Input, InputNumber, Typography, Popconfirm, Table, Modal, Space  } from "antd";
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
const DictionaryTable = ({queryParam, setQueryParam, queryName, setQueryName}) => {
  // const [queryParam, setQueryParam] = useState('');
  // const [queryName, setQueryName] = useState('');
  const [form] = Form.useForm();
  const [columns, setColumns] = useState([]);
  const [filterColumn, setFilterColumn] = useState('');
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


  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [EditColumn, setEditColumn] = useState(null);
  const[prevEditColumn, setPrevEditColumn] =useState(null);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = async () => {
    console.log("New column header name: ", EditColumn)
    // mergedColumns = mergedColumns.filter(column => column.dataIndex !== dataIndex);
    setIsEditModalOpen(false);

    let updateData = await fetch(`api/dictField/updateFieldName`, {
      method: "POST",
      body: JSON.stringify(
        {"currFieldName": prevEditColumn,
        newFieldName: EditColumn.name,
        "lid": queryParam
        })
      })
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log(err);
      });
      console.log("Updated Column Data: ", updateData)

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
    // handleAddColumn()
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

  // Delete a column
  const handleDeleteColumn = async (dataIndex) => {
    mergedColumns = mergedColumns.filter(column => column.dataIndex !== dataIndex);
    setColumns(mergedColumns)
    setFilterColumn(dataIndex)
    console.log("New columns after delete: ", mergedColumns)

    for (const row in data) {
      console.log("HERE", data[row]);
      delete data[row][dataIndex];
    }
    setData(data)
    console.log("Data after delete column", data)

    await fetch(`api/dictField/deleteField`, {
      method: "POST",
      body: JSON.stringify(
        {"field": dataIndex,
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
    // if (Object.keys(firstObject)[colHeader] !== "id" && Object.keys(firstObject)[colHeader] !== "key") { // add to remove id and key columns -> for testing purposes only
    console.log(Object.keys(firstObject)[colHeader])
    const col = {
        title: Object.keys(firstObject)[colHeader],
        dataIndex: Object.keys(firstObject)[colHeader],
        key: Object.keys(firstObject)[colHeader],
        width: '20%',
        editable: true,
        sorter: (a, b) => {
          console.log(typeof(a[Object.keys(firstObject)[colHeader]]), typeof(b[Object.keys(firstObject)[colHeader]]))
          if (typeof(a[Object.keys(firstObject)[colHeader]]) === 'number' && typeof(b[Object.keys(firstObject)[colHeader]]) === 'number') {
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
          <div>
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </Typography.Link>
            <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.id, record)}>
              <a><DeleteOutlined style={{ marginLeft: 12 }}/> </a>
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

  if (filterColumn) {
    mergedColumns = mergedColumns.filter(column => column.dataIndex !== filterColumn);
  }

  // if (EditColumn) {
  //   console.log("HHHHHHHHHHHHH", mergedColumns)
    // if (mergedColumns.includes(prevEditColumn)) {
    //   mergedColumns[prevEditColumn].title = EditColumn.name
    //   console.log("nnnnnnnnnnnn", mergedColumns)
    // }
    // mergedColumns = mergedColumns.filter(column => column.dataIndex !== prevEditColumn);
    // mergedColumns.push(EditColumn.name)


    // var i;
    // for(i = 0; i < data.length; i++){
    //   console.log("ROW", data[i], EditColumn.name)
    //   // data[i][EditColumn.name] = data[i][prevEditColumn];
    //   // delete data[i].prevEditColumn;
    // }
  // }

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(window.location.search);
  //   const queryParam = searchParams.get('lid');
  //   const queryName = searchParams.get('lname');
  //   if (queryParam) {
  //     setQueryParam(queryParam.replace(/\s+/g, ''));
  //     setQueryName(queryName);
  //     console.log("QUERY ", queryParam.replace(/\s+/g, ''));
  //   }
  // }, []);

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
    let newData = {};
    // console.log("HHHHH",defaultColumns)
    for (const colHeader in cols) {
      console.log("HERE", cols[colHeader].title);
      if (cols[colHeader].title === "" || cols[colHeader].title === "id") {
        continue;
      } else {
        newData[cols[colHeader].title] = `Insert data here`;
      }
    }
    console.log("ADDDDDD", newData);

    let newword = await fetch(`api/word/addWord`, {
      method: "POST",
      body: JSON.stringify({ data: newData, lid: queryParam }),
    })
      .then((resp) => {
        return resp.json();
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("Added Word to Database: ", newword);

    newData.id = newword.newWordKey;
    console.log("IDDDDDDDDD", newData.id)
    newData.key = data.length;
    setData([...data, newData]);
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

  const handleAddColumn = async () => {
    console.log("Add this column", AddColumn)
    for (const row in data) {
      console.log("HERE", data[row]);
      data[row][AddColumn.name] = 'insert data here'
    }
    console.log("Data after adding column", data)

    const col = {
      title: AddColumn.name,
      dataIndex: AddColumn.name,
      key: AddColumn.name,
      width: '20%',
      editable: true,
      sorter: (a, b) => {
        console.log("TEST")
        if (typeof(a[AddColumn.name]) === 'number' && typeof(b[AddColumn.name]) === 'number') {
          return a[AddColumn.name] - b[AddColumn.name];
        } else {
          return String(a[AddColumn.name]).localeCompare(String(b[AddColumn.name]))
        }
      },
      sortDirections: ['descend', 'ascend'],
      onFilter: (value, record) => {
        return String(record[AddColumn.name]).includes(value);
      }
    }
    mergedColumns.push(col)
    setColumns(mergedColumns)

    await fetch(`api/dictField/addField`, {
      method: "POST",
      body: JSON.stringify(
        {"fieldName": AddColumn.name,
        "lid": queryParam
        })
      })
      .then(resp => {
        return resp.json();
      })
      .catch(err => {
        console.log(err);
      });

    // let newword = await fetch(`api/word/addWord`, {
    //   method: "POST",
    //   body: JSON.stringify({ data: newData, lid: queryParam }),
    // })
    //   .then((resp) => {
    //     return resp.json();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
    />;
    </Form>
    </div>
  );
};
export default DictionaryTable;
