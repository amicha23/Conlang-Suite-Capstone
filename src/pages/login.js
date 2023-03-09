// import 'antd/dist/antd.css';
import { Input } from 'antd';
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

//icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

import {saveUserInfo} from "src/app/user"


const { TextArea } = Input;


export default function login() {
  const [email, setValue] = useState('');
  const [password, setPassword] = useState('');


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
                <Input id="password" placeholder="Password" onChange={e => { setPassword(e.currentTarget.value); }}/>

                <p>Forgot password?</p>
                
                <div id="signin-button">
                <br></br>
                <Button type="primary" onClick={() => saveUserInfo(email, password)}>Sign in</Button>
                </div>
                <Button icon={<GoogleOutlined />}>Sign in with Google</Button>
                

                
              </div>

              
            </Content>
          </Layout>
      </div>
  );
}