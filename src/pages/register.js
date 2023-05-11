import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { GoogleOutlined, KeyOutlined, UploadOutlined } from '@ant-design/icons';
import {googleLogin, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { notification } from 'antd';


function registerUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Check if email and password meet requirements
  const validEmail = /\S+@\S+\.\S+/.test(email);
  const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  if (!validEmail || !validPassword) {
    // Show error notification
    notification.error({
      message: 'Invalid email or password',
      description: 'Please enter a valid email address and a password with at least 8 characters, including at least one letter and one number.',
    });
    return;
  }

  // Proceed with user registration
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // ...
    })
    .catch((error) => {
      // ...
    });
}

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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        // check if email and password meet certain requirements
        if (email.length >= 6 && password.length >= 8) {
            // trigger browser notification
            if ("Notification" in window) {
                Notification.requestPermission().then((permission) => {
                    if (permission === "granted") {
                        new Notification("Email and password meet requirements!");
                    }
                });
            }
        }

        // call the registerUser function
        registerUser();
    };

    return (
        <div className="container">
            <section className="d-flex justify-content-center" >
                <div>
                <img src="/img/langtime_studio_logo-transformed.png" alt="test"/>
                <h2 class="text-center">Create an account</h2>
                <div id="first-page-setup">
                    <p class="mb-1">Name</p>
                    <Input id="username" placeholder="Name"/>
                    <p class="mb-1">Email</p>
                    <Input id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
                    <p class="mt-3 mb-1">Password</p>
                    <Input className = "mb-2"type ="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                    <i className='fa fa-eye showpd'/>
                    <div className = "d-grid gap-1" id="signin-button">
                    <Button type="primary" onClick={() => registerUser()}>Sign up</Button>
                    <Button icon={<GoogleOutlined/>} onClick={() => googleLogin()}>Sign in with Google</Button>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                    <p class="mt-4 text-center">Already have an account? <Link href="login" className="text-primary fw-semibold">Sign in</Link> </p>
                </div>              
                </div >
            </section>
        </div>
    );
}
