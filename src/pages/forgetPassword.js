import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";

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
              <img src="https://www.iths.org/resources/wp-content/sabai/sites/9/File/files/0bb1f4cb5ff99dd034602ced0e2534fc.png" alt="test"/>

              <h1>Forgot Password?</h1>
              <div id="first-page-setup">
                <p className="mb-1">Email</p>
                <Input id="email" placeholder="Email"/>
                <p className="mt-3 mb-1">Password</p>
                <Input className = "mb-2"type ="password" id="password" placeholder="Password"/>
                <i className='fa fa-eye showpd'/>
                
                <div className = "d-grid gap-1" id="signin-button">
                  <Button type="primary" onClick={() => resetPassword()}>Sign in</Button>
                  <div className="g-signin2" data-onsuccess="onSignIn"></div>
                </div>               

              </div>              
            </div >
        </section>
      </div>
    )
}