import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { KeyOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { resetPassword, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";
import 'bootstrap/dist/css/bootstrap.css';
{/* <link rel="stylesheet" href="styles.css"></link> */}
import Link from 'next/link';

export default function forgetPassword() {

    return (
        <div className="container">
        <section className="d-flex justify-content-center" >
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <KeyOutlined style={{fontSize: '80px', color: blue.primary }}/>

              <h1>Forgot Password?</h1>
              <p>Reset by entering your email below</p>
              <div id="first-page-setup">
                <p className="mb-1">Email</p>
                <Input id="email" placeholder="Email"/>
                <p className="mt-3 mb-1"></p>                
                <i className='fa fa-eye showpd'/>
                
                <div className = "d-grid gap-1" id="pwreset-button">
                  <Button type="primary" href="/" onClick={() => resetPassword()}>Reset password</Button>
                  
                </div>               

              </div>              
            </div >
        </section>
      </div>
    )
}