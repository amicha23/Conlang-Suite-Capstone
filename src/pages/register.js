import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { GoogleOutlined, KeyOutlined, UploadOutlined } from '@ant-design/icons';
import {registerUser, googleLogin, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";
import 'bootstrap/dist/css/bootstrap.css';
{/* <link rel="stylesheet" href="styles.css"></link> */}

const ShowHideDiv = function (check, season) {
    let el = document.getElementById(season);
    
    // hide element(s)
    el.classList.add('hidden');
    
    // Show element(s) if checked
    if(check.checked === true){
      el.classList.remove('hidden');
    }
  }

export default function register() {

    return (
        <div className="container">
            <section className="d-flex justify-content-center" >
                <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
                <img src="/img/langtime_studio_logo-transformed.png" alt="test"/>
                <h2 class="text-center">Create an account</h2>
                <div id="first-page-setup">
                    <p class="mb-1">Name</p>
                    <Input id="username" placeholder="Name"/>
                    <p class="mb-1">Email</p>
                    <Input id="email" placeholder="Email"/>
                    <p class="mt-3 mb-1">Password</p>
                    <Input className = "mb-2"type ="password" id="password" placeholder="Password"/>
                    <i className='fa fa-eye showpd'/>
                    <div className = "d-grid gap-1" id="signin-button">
                    <Button type="primary" onClick={() => registerUser()}>Sign up</Button>
                    <Button icon={<GoogleOutlined/>} onClick={() => googleLogin()}>Sign in with Google</Button>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                    <p class="mt-4 text-center">Already have an account? <span className="text-primary fw-semibold">Sign in</span> </p>
                </div>              
                </div >
            </section>
        </div>
    );
}