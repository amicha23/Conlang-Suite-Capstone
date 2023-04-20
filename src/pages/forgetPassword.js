// PACKAGES 

import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.css';
import { Layout, Space } from 'antd';
import { useRouter } from 'next/router';

// FILES
import { resetPassword, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";

const { Header, Footer, Sider, Content, Panel } = Layout;

const contentStyle = {
  textAlign: 'center',
  minHeight: 12,
  lineHeight: '12px',
  color: '#000',
  backgroundColor: '#ffffff',
  justifyContent: 'center',
  display: 'flex',
  marginTop: '150px',
};

const returnLoginStyle = {
  display: 'flex',
  marginTop: '30px',
  justifyContent: 'center',
  color: '#595959',
  pointerEvents: 'auto',
  cursor: 'pointer',
}

export default function forgetPassword() {
  const router = useRouter();

    return (
      <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
      size={[0, 48]}
    >
        <Content style={contentStyle}>
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <center>
                <img src="/img/keyoutlined.png" alt="test"/>
              </center>
              <h1>Forgot Password?</h1>
              <p className='text-secondary text-center pb-3'>Reset by entering your email below</p>
              <div id="first-page-setup">
                <p style={{textAlign: 'left', marginLeft: '4px'}} className="mb-1">Email</p>
                <Input style={{marginTop: '5px'}} id="email" placeholder="Email"/>
                
                <div className = "d-grid gap-1" style={{marginTop:'10px'}} id="pwreset-button">
                  <Button type="primary"  onClick={() => resetPassword()}>Reset password</Button>
                </div> 

                <div>            
                  <p style={returnLoginStyle} id="returnlogin" onClick={() => router.push('login')}><ArrowLeftOutlined style={{marginRight: '10px'}}/> Return to login</p>
                </div>              
              </div>              
            </div >
          </Content>
      </Space>
    )
}