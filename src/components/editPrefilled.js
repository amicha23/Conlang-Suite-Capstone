// Dictionary Prefilled Fields setup view

import { Input, Modal } from "antd";
import { UploadOutlined, DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, message, Upload, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
import addField from "../pages/api/dictField/addField";
import deleteField from "../pages/api/dictField/deleteField";
import updateField from "../pages/api/dictField/updateFieldName";
import getLangData from '../pages/api/language/getLangData';

//css
import "../app/page.module.css";

//icons
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  InfoCircleOutlined,
  InfoCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { query } from "firebase/database";

export function EditPrefilledForms({ fields, setFields, data, setData, queryParam}) {
  return (
    <div>
      <br></br>
      <PreFilledList setFields={setFields} fields={fields} data={data} setData={setData} queryParam={queryParam} />

      {/* <AddInput setFields={setFields} /> */}

      {/* <Button type="primary" htmlType="submit" onClick={onFinish}>
          Submit
      </Button> */}
    </div>
  );
}

function PreFilledList({ fields, setFields, data, setData, queryParam}) {
  if (!fields.length) {
    return <p>No prefilled fields</p>;
  }

  // const [field, setField] = useState("");

  const handleInputChange = (event, index) => {
    // Get the updated value from the input event
    const newValue = event.target.value;

    // Update the fields array with the new value
    const updatedFields = [...fields];
    updatedFields[index] = newValue;
    setFields(updatedFields);
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [EditColumn, setEditColumn] = useState('');
  const [prevEditColumn, setPrevEditColumn] = useState(null);
  const showEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleEditOk = async () => {
    console.log("New column header name: ", EditColumn)
    setIsEditModalOpen(false);

    let updateFieldData = ''
    console.log("EEEE", EditColumn)
    if (EditColumn !== '') {
      updateFieldData = await updateField({
        "currFieldName": prevEditColumn,
        'newFieldName': EditColumn.name,
        "lid": queryParam
      });
    }



    // let updateFieldData = await updateField({
    //   "currFieldName": prevEditColumn,
    //   'newFieldName': EditColumn.name,
    //   "lid": queryParam
    // });

    if (updateFieldData === "Success") {
      console.log('updated column called :>> ', EditColumn.name);
      // await fetchData()
    } else {
      console.log("updated column failed ", updateFieldData)
    }

    let getLandData = await getLangData({'lid' : queryParam});

    if (typeof(getLandData) !== String ) {
      console.log('FETCH', getLandData);
      setData(getLandData)

      setFields(getLandData['dictHeaders'])
    } else {
      console.log("failed to fetch data ", getLandData)
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
    // setFields((prevTodos) => {
    //   return prevTodos.concat(AddColumn.name);
    // });

    let getLandData = await getLangData({'lid' : queryParam});

    if (typeof(getLandData) !== String ) {
      console.log('FETCH', getLandData);
      setData(getLandData)

      setFields(getLandData['dictHeaders'])
    } else {
      console.log("failed to fetch data ", getLandData)
    }
  }



  return (
    <div>
      <Form>
        {fields.map((field, key) => (
          <Form.Item key={key}>
            <Input
              value={field}
              style={{ width: "370px" }}
              // readOnly={
              //   field === "Orthographic forms" ||
              //   field === "English definition"
              // }
              readOnly
              onChange={
                field !== "Orthographic forms" &&
                field !== "English definition"
                  ? (e) => handleInputChange(e, key)
                  : null
              } // Pass the event and index to the handler only if editable
            />
            {field !== "Orthographic forms" &&
              field !== "English definition" && (
                <div style={{display:'inline-block'}}>
                <DeleteInput field={field} setFields={setFields} queryParam={queryParam} />
                      <Button
                    onClick={() => handleEditColumn(field, close)}
                    size="small"
                    type="link"
                  >
                    Edit
                  </Button>
                </div>

              )}
                <Modal title="Edit Column Header" description="This action cannot be undone" open={isEditModalOpen} onOk={handleEditOk} onCancel={handleEditCancel}>
                        <Input
                        // value='Column Name'
                        required
                        // defaultValue={prevEditColumn}
                        onChange={(e) => {
                          setEditColumn(() => {
                            console.log("NAME: ", e.target.value)
                              return { name: e.target.value };
                          });
                        }}
                      // onChange={(e) => {
                      //     return e.target.value ;
                      // }}
                      />
                </Modal>
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

          </Form.Item>
        ))}
      </Form>
      <Form
        id="dynamicForm"
        name="dynamic_form_item"
        onFinish={(values) => {
          // console.log("custom values ", values['names']);
          console.log("inside data ", values["names"]);
        }}
      >
        <Form.List name="names">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Form.Item required={false} key={field.key}>
                  <Form.Item
                    {...field}
                    validateTrigger={["onChange", "onBlur"]}
                    rules={[
                      {
                        required: false,
                        whitespace: false,
                      },
                    ]}
                    noStyle
                  >
                    <Input
                      placeholder="Input field name"
                      name={index}
                      style={{
                        width: "370px",
                      }}
                      // onChange={updateData}
                    />
                  </Form.Item>
                  {fields.length > 0 ? (
                    <DeleteOutlined
                      className="dynamic-delete-button"
                      name={index}
                      onClick={() => remove(field.name)}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  onClick={async (e) => {//add()
                  // let newField = addField({lid:queryParam, fieldName:e.target.value})
                  setIsAddModalOpen(true)
                  // let temp = 'undefined'+ Math.random().toString(16).slice(2);
                  // let newField = await addField({lid:queryParam, fieldName:temp})
                  // console.log("Add new field: ", newField)}
                  }}
                  style={{
                    width: "370px",
                  }}
                  icon={<PlusOutlined />}
                >
                  Add custom field
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

function DeleteInput({ field, setFields, queryParam }) {
  async function handleDelete() {
    // const confirmed = window.confirm("Do you want to delete this?");
    // if (confirmed) {
    setFields((prevTodos) => {
      return prevTodos.filter((t) => t !== field);
    });
    console.log("FNAME", field)
    let removeField = await deleteField({lid:queryParam, field:field})
    console.log("Delete field: ", removeField)
    // }
  }

  return (
    <span
      onClick={handleDelete}
      role="button"
      // style={{
      //   color: "red",
      //   fontWeight: "bold",
      //   marginLeft: 10,
      //   cursor: "pointer"
      // }}
    >
      <DeleteOutlined />
    </span>
  );
}

function EditInput({ field, setFields, queryParam, newFieldName }) {
  async function handleEdit(e) {
    // const confirmed = window.confirm("Do you want to delete this?");
    // if (confirmed) {
    // setFields((prevTodos) => {
    //   return prevTodos.filter((t) => t !== field);
    // });
    console.log("Edit this field name: ", field, "into ", e.target.parentNode.parentNode.parentNode.parentNode.firstChild.value)
    // let editField = updateField({lid:queryParam, newFieldName:e.target.value})
    // console.log("Edit field: ", editField)
    // }
  }

  return (

    <span
      onClick={handleEdit}
      role="button"
      // style={{
      //   color: "red",
      //   fontWeight: "bold",
      //   marginLeft: 10,
      //   cursor: "pointer"
      // }}
    >
      <SaveOutlined />
    </span>
  );
}

function AddInput({ setFields }) {
  const inputRef = React.useRef();

  // Come back to this if add button un-disabled
  function handleAdd(event) {
    // event.preventDefault();
    const text = event.target.value;
    const todo = {
      id: Math.random(),
      text,
      done: false,
    };
    setFields((prevTodos) => {
      return prevTodos.concat(todo);
    });
    // inputRef.current.value = "";
  }

  return (
    <Button
      onClick={(event) => handleAdd(event)}
      style={{
        width: "370px",
      }}
      icon={<PlusOutlined />}
      disabled
      name="addTodo"
    >
      Add custom field
    </Button>

    // <form onSubmit={handleAddTodo}>
    //   <input ref={inputRef} name="addTodo" placeholder="Add todo" />
    //   <button type="submit">Submit</button>
    // </form>
  );
}
