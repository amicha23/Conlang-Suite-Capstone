// Dictionary Prefilled Fields setup view

import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Form } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

//css
import '../app/page.module.css';

//icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone, PlusOutlined } from '@ant-design/icons';



export function DictionaryPrefilledForms({fields, setFields}) {



  return (
    <div>
      <br></br>
      <PreFilledList setFields={setFields} fields={fields} />

      <AddInput setFields={setFields} />

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

  return (
    <Form>
      {fields.map((field, key) => (

        <Form.Item >
          <Input
            onDoubleClick={() => handleToggleTodo(todo)}
            key={key}
            value={field}
            style={{width: "370px"}}
            // ref="searchStringInput"
            // onChange={this.handleChange}
          />
          <DeleteInput field={field} setFields={setFields} />
        </Form.Item>
      ))}
    </Form>
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
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
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
      done: false
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
      width: '370px',

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
