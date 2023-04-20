// Dictionary Prefilled Fields setup view

import { Input } from "antd";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button, message, Upload, Form } from "antd";
import React, { useEffect, useState } from "react";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;

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

export function DictionaryPrefilledForms({ fields, setFields }) {
  return (
    <div>
      <br></br>
      <PreFilledList setFields={setFields} fields={fields} />

      {/* <AddInput setFields={setFields} /> */}

      {/* <Button type="primary" htmlType="submit" onClick={onFinish}>
          Submit
      </Button> */}
    </div>
  );
}

function PreFilledList({ fields, setFields }) {
  if (!fields.length) {
    return <p>No prefilled fields</p>;
  }

  const [field, setField] = useState("");

  const handleInputChange = (event, index) => {
    // Get the updated value from the input event
    const newValue = event.target.value;

    // Update the fields array with the new value
    const updatedFields = [...fields];
    updatedFields[index] = newValue;
    setFields(updatedFields);
  };

  return (
    <div>
      <Form>
        {fields.map((field, key) => (
          <Form.Item key={key}>
            <Input
              value={field}
              style={{ width: "370px" }}
              readOnly={
                field === "Orthographic forms" ||
                field === "English definition"
              }
              onChange={
                field !== "Orthographic forms" &&
                field !== "English definition"
                  ? (e) => handleInputChange(e, key)
                  : null
              } // Pass the event and index to the handler only if editable
            />
            {field !== "Orthographic forms" &&
              field !== "English definition" && (
                <DeleteInput field={field} setFields={setFields} />
              )}
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
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  ) : null}
                </Form.Item>
              ))}
              <Form.Item>
                <Button
                  onClick={() => add()}
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

function DeleteInput({ field, setFields }) {
  function handleDelete() {
    // const confirmed = window.confirm("Do you want to delete this?");
    // if (confirmed) {
    setFields((prevTodos) => {
      return prevTodos.filter((t) => t !== field);
    });
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
