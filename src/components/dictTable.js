// Create a table to hold all dictionary information

import { Button, Form, Input, Popconfirm, Table } from 'antd';
import { set } from 'firebase/database';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

//icons
import { SearchOutlined, EditTwoTone, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import '../app/globals.css';
const { Search } = Input;


// Create editable cells
const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};


// Create Dictionary Table Component
const DictionaryTable = ({lid}) => {
  const router = useRouter()
  let query=router.query['lid']
  console.log("Query Param: ", query);

  console.log("Dictionary Table: ", lid)
  const [data, setData] = useState([]);
  const [dataCopy, setDataCopy] = useState(null);
  const [defaultColumns, setColumns] = useState([]);
  const [searchedText, setSearchedText] = useState("")
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [dataSource, setDataSource] = useState([
    {
      id: '-NQ9MOINxEjSe_Wwitd3',
      'Original form': 'sda',
      'Parts of speech': 'noun'
    },
    {
      id: '-NQ9MOINxEjSe_Wwitd4',
      'Original form': 'sample original form',
      'Parts of speech': 'verb'
    },
  ]);


  const [count, setCount] = useState(0);
  // Make call to language's dictionary
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // WIP: why do you need to go back to dashboard if you want a different table?
        console.log("LID", query.replace(/\s+/g, ''))
        let responseJson = await fetch(`api/word/getWords`, {
          method: "POST",
          body: JSON.stringify(
            {"lid": query.replace(/\s+/g, '')
            })
        });
        const newData = await responseJson.json();
        console.log("response dictionary: ", newData);

        let firstObject = newData[0] || {};
        const cols = [];
        for (const colHeader in Object.keys(firstObject)) {
          console.log(Object.keys(firstObject)[colHeader])
          const col = {
              title: Object.keys(firstObject)[colHeader],
              dataIndex: Object.keys(firstObject)[colHeader],
              width: '20%',
              editable: true,
              filteredValue: [searchedText],
              onFilter: (value, record) => {
                return String(record[Object.keys(firstObject)[colHeader]]).includes(value);
              }
          }
          cols.push(col);
        }
        cols.push({
          // title: '',
          // dataIndex: 'operation',
          // render: (_, record) => {
          //   // data.length >= 1 ? (
          //     <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.key, record)}>
          //       <a><DeleteOutlined /></a>
          //     </Popconfirm>
          //   // ) : null,
          // }
          render: (_,  record) => {
            return (
              <>
                <Popconfirm title="Save this row?" onConfirm={() => handleToDatabase(record)}>
                <a><EditOutlined/></a>
                </Popconfirm>

                <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.key, record)}>
                  <a><DeleteOutlined style={{ marginLeft: 12 }}/> </a>
                </Popconfirm>

                {/* /> */}
              </>
            );
          },

        })


        setColumns(cols)
        setData(newData);
        setDataCopy(newData)
        setLoading(false);
        setCount(data.length)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: Object.keys(data).length,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
            // Pagination changes based on size of data (Shows page dropdown at 200 rows)
          },
        });
        console.log("Number of rows: ", Object.keys(data).length)
      } catch(e) {
        console.log("Error getting dictionary table: ", e)
      }
    };
    fetchData();

  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('params', pagination, filters, sorter);
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        total: Object.keys(data).length,
        // 200 is mock data, you should read it from server
        // total: data.totalCount,
        // Pagination changes based on size of data (Shows page dropdown at 200 rows)
      },
      filters,
      ...sorter
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
      setDataCopy([]);
    }
  };


  // if (data) {
    console.log("Dictionary Table Component Response Data: ", data)

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
      setDataCopy(newData);

      console.log("DELETE THIS ROW FROM DATABASE: ", record);
      await fetch(`api/word/deleteWord`, {
        method: "POST",
        body: JSON.stringify(
          {"data": record,
          "lid": query.replace(/\s+/g, '')
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

    // const defaultColumns = []

    // for (var col of Object.keys(data[0])) {
    //   // console.log(key + " -> " + data[key])
    //   console.log("Column name: ", col)
    //   defaultColumns.push({
    //     title: col,
    //     dataIndex: col,
    //     width: '20%',
    //     editable: true,
    //     filteredValue: [searchedText],
    //     onFilter: (value, record) => {
    //       return String(record[col]).includes(value);
    //     }
    //   })
    // }
    // data && Object.keys(data[0])?.map((col) => (
    //   <span>{defaultColumns.push({
    //       title: col, dataIndex: col,
    //       //defaultSortOrder: 'descend',
    //       sorter: true,
    //       filteredValue: [searchedText],
    //       onFilter: (value, record) => {
    //         console.log("ASJLDHASDJ : ", record[col])
    //         // for (var testcol of Object.keys(data[0])) {
    //           // console.log("JASLADJDS ", testcol)
    //         return String(record[col]).includes(value);
    //         // }
    //       }
    //   })}
    //   </span>))


    // if (defaultColumns.length === Object.keys(data[0]).length) {
    //   defaultColumns.push({
    //     title: '',
    //     dataIndex: 'operation',
    //     render: (_, record) =>
    //       data.length >= 1 ? (
    //         <Popconfirm title="Are you sure delete this row?" onConfirm={() => handleDelete(record.key, record)}>
    //           <a><DeleteOutlined /></a>
    //         </Popconfirm>
    //       ) : null,
    //   })
    // }

    // const newData = []
    // for (var key of Object.keys(data)) {
    //   console.log(data.size)
    //   for (let i = 0; i < 1; i++) {
    //     console.log(key + " -> " + Object.keys(data[key][i]))
    //     newData[key] = data[key][i][Object.keys(data[key][i])]
    //     // newData.push(row)
    //   }
    // }
    // console.log("NEW ", newData)

    // !!!!!!!!!!!===+=== Orignal columns set by antd  below ===+===!!!!!!!!!!!!!


    //  defaultColumns = [
      // {
      //   title: 'name',
      //   dataIndex: 'name',
      //   width: '30%',
      //   editable: true,
      // },
      // {
      //   title: 'age',
      //   dataIndex: 'age',
      // },
      // {
      //   title: 'address',
      //   dataIndex: 'address',
      // },
    //   {
    //     title: 'operation',
    //     dataIndex: 'operation',
    //     render: (_, record) =>
    //       dataSource.length >= 1 ? (
    //         <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //           <a>Delete</a>
    //         </Popconfirm>
    //       ) : null,
    //   },
    // ];


    // Add new table row
    const handleAdd = async () => {
      let newData = {}
      for (const colHeader in Object.keys(data[0])) {
        // const newData = {
        //   key: count,
        //   'Original form': `Insert data here`,
        //   'Parts of speech': `Insert data here`
        // };
        newData[Object.keys(data[0])[colHeader]] = `Insert data here`;
      }


      let newword = await fetch(`api/word/addWord`, {
        method: "POST",
        body: JSON.stringify(
          {"data": newData
          })
        })
        .then(resp => {
          // console.log("Added word ", resp.json())
          return resp.json();
        })
        .catch(err => {
          console.log(err);
        });

        console.log("Added Word to Database: ", newword);


        newData.id= newword.newWordKey;
        newData.key = data.length;
        setData([...data, newData]);
        setDataCopy([...data, newData]);
        setCount(count + 1);
    };

    // Save new table row to the data
    const handleSave = (row) => {
      const newData = [...data];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, {
        ...item,
        ...row,
      });
      setData(newData);
      setDataCopy(newData);
    };
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = defaultColumns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave,
        }),
      };
    });

    const handleSearch = (e) => {
      console.log("Search Query: ", e)
      setData(dataCopy)
      let queryData = [];
      for (var i = 0; i < data.length; i++){
        console.log("row index: " + i);
        var obj = data[i];
        for (var key in obj) {
          var value = obj[key];
          if (String(value).includes(e)) {
            console.log("cell - " + key + ": " + value);
            queryData.push(obj)
          }
        }
      }
      setData(queryData);
      console.log("Search Queried Data: ", data);
    // input search filer
      // let searchButton = document.getElementById("input-filter").parentElement.nextSibling;
      // let searchQuery = document.getElementById("input-filter").value;
      //   searchButton.onclick = function() { alert('blah'); };
      //   console.log(searchQuery)
      // const newData = data.filter((item) => item.key !== key);
      // setData(newData);
      // const newData = data.filter((item) => item.key !== key);
      // setData(newData);
    };

    // press save button to save data to database
    const handleToDatabase = (record) => {
      console.log("SAVE THIS UPDATED DATA TO DATABASE: ", record);
        fetch(`api/word/updateWord`, {
          method: "POST",
          body: JSON.stringify(
            {"data": record
            })
          })
          .then(resp => {
            return resp.json();
          })
          .catch(err => {
            console.log(err);
          });
    };
    return (
      <div>
        <div id="lang-name-header" >
          <h1>{router.query['lname']}</h1>
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
        <Button onClick={handleToDatabase} type="primary" style={{ 'margin-left': '15px'}} ghost>
          <EditTwoTone />
          Save
        </Button>
        <Button style={{ 'margin-left': '15px'}}>
          <SearchOutlined />
          Find and Replace
        </Button>
        <Search id="input-filter" onSearch={(value) => {setSearchedText(value);}} placeholder="input search text" allowClear style={{ width: 200, 'margin-left': '35%'}} />
        <Button>
          Stats
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={data}
          columns={columns}
          loading={loading}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          scroll={{x:950,y:"calc(100vh - 220px)" }}
        />
      </div>
    );
  }
  // } else {
  //   return <div>error loading dictionary</div>
  // }
// }

export default DictionaryTable;