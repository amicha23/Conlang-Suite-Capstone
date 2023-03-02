// Dictionary Custom Fields Setup View


import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Form } from 'antd';
import React, { useRef, useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


//icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';


export function DictionaryCustomForms() {

  return (
    <Form id="dynamicForm"  name="dynamic_form_item" onFinish={(values) => {
      // console.log("custom values ", values['names']);
      console.log("inside data ", values["names"])
      }
      }>
      <Form.List
        name="names"

      >

        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: false,
                      whitespace: true
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Input field name"
                    name={index}
                    style={{
                      width: '370px',
                    }}
                    // onChange={updateData}
                  />
                </Form.Item>
                {fields.length > 0 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    name={index}
                    onClick={() => {
                        remove(field.name)
                      }
                    }
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                onClick={() => add()}
                style={{
                  width: '370px',
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
      {/* <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
    </Form>
  );
};