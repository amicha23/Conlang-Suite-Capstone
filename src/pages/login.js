// import 'antd/dist/antd.css';
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

//icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

import saveUserInfo from "../app/dictionary"


const { TextArea } = Input;



// Implement file upload later
const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};


export default function setup() {
  const [langName, setValue] = useState('');
  const [langDesc, setDesc] = useState('');


  return (
      <div>
          <Layout>            
            <Content style={{ padding: '0 20px', background: 'white'}}>
              <h1>Log in to your account</h1>
              <p>Welcome! Please enter your details</p>
              <div id="first-page-setup">
                <p>Email</p>
                <Input id="email" placeholder="Email" onChange={e => { setValue(e.currentTarget.value); }}/>
                <p>Password</p>
                <Input id="password" placeholder="Password" onChange={e => { setValue(e.currentTarget.value); }}/>

                <p>Forgot password?</p>
                
                <div id="signin-button">
                <br></br>
                  <Button type="primary" onClick={() => saveUserInfo({email, password})} >Sign in</Button>
                </div>

                <Button icon={<UploadOutlined />}>Sign in with Google</Button>
                

                
              </div>

              
            </Content>
          </Layout>
      </div>
  );
}