// import 'antd/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core'; //this is for the eye icon show/hide password switch
import 'bootstrap/dist/css/bootstrap.css';
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

//function to toggle hide/show password
function showPwd(id, el) {
  let x = document.getElementById(id);
  if (x.type === "password") {
    x.type = "text";
    el.className = 'fa fa-eye-slash showpwd';
  } else {
    x.type = "password";
    el.className = 'fa fa-eye showpwd';
  }
}

export default function login() {

  return (
      <div className="container">
        <section className="d-flex justify-content-center" >
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <img src="https://www.iths.org/resources/wp-content/sabai/sites/9/File/files/0bb1f4cb5ff99dd034602ced0e2534fc.png" alt="test"/>
              <img src="./img/eiffel.jpg"/>

              <h1>Log in to your account</h1>
              <p >Welcome! Please enter your details</p>
              <div id="first-page-setup">
                <p>Email</p>
                <Input id="email" placeholder="Email"/>
                <p>Password</p>
                <Input type ="password" id="password" placeholder="Password"/>
                <i className='fa fa-eye showpd'/>

                <p onClick={() => resetPassword()}>Forgot password?</p>
                
                <div id="signin-button">
                <br></br>
                <Button type="primary" onClick={() => loginUser()}>Sign in</Button>
                </div>
                <Button icon={<GoogleOutlined />}>Sign in with Google</Button>
              </div>              
            </div >
        </section>
      </div>
      
  );
}