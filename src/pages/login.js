// import 'antd/dist/antd.css';
import { Input } from 'antd';
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

//icons
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons';

import {loginUser, googleLogin, resetPassword} from "src/app/user"
import { db, auth } from "firebaseConfig/firebaseAdmin";


const { TextArea } = Input;


export default function login() {

  return (
      <div>
          <Layout>            
            <Content style={{ padding: '0 20px', background: 'white'}}>
              <h1>Log in to your account</h1>
              <p>Welcome! Please enter your details</p>
              <div id="first-page-setup">
                <p>Email</p>
                <Input id="email" placeholder="Email"/>
                <p>Password</p>
                <Input id="password" placeholder="Password"/>

                <p onClick={() => resetPassword()}>Forgot password?</p>
                
                <div id="signin-button">
                <br></br>
                <Button type="primary" onClick={() => loginUser()}>Sign in</Button>
                </div>
                <Button icon={<GoogleOutlined />} 
                        onClick={() => googleLogin()}>Sign in with Google</Button>
                

                
              </div>

              
            </Content>
          </Layout>
      </div>
  );
}