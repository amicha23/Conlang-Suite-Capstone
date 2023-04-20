import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { ArrowLeftOutlined } from '@ant-design/icons';
import { blue } from '@ant-design/colors';
import { resetPassword, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';

export default function forgetPassword() {

    return (
        <div className="container">
        <section className="d-flex justify-content-center" >
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <center>
                <img src="/img/keyoutlined.png" alt="test"/>
              </center>
              <h1>Forgot Password?</h1>
              <p>Reset by entering your email below</p>
              <div id="first-page-setup">
                <p className="mb-1">Email</p>
                <Input id="email" placeholder="Email"/>
                <p className="mt-3 mb-1"></p>                
                
                <div className = "d-grid gap-1" id="pwreset-button">
                  <Button type="primary"  onClick={() => resetPassword()}>Reset password</Button>
                  
                </div> 
                <div>
                  <ArrowLeftOutlined /> 
                  <p id="returnlogin" >return to login</p>
                </div>              
              </div>              
            </div >
        </section>
      </div>
    )
}