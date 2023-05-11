import 'bootstrap/dist/css/bootstrap.css';
import { Input } from 'antd';
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Form } from 'antd';
import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import { db, auth } from "firebaseConfig/firebaseAdmin";
import { getDatabase, ref, set as firebaseSet, onValue } from 'firebase/database';
import { googleLogin, resetPassword } from "src/app/user"
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons'; // icons
import Link from 'next/link';
import { useRouter } from 'next/router';
import { notification } from 'antd';

function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

const { Header, Footer, Sider, Content } = Layout;
const { TextArea } = Input;

const linkStyle = {
  pointerEvents: 'auto',
  cursor: 'pointer',
}

function loginUser() {
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

        // call the loginUser function
        loginUser();
    };
  const router = useRouter();
  return (
      <div className="container">
        <section className="d-flex justify-content-center" >
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <img src="/img/langtime_studio_logo-transformed.png" alt="langtime logo"/>

              <h1 style={{marginLeft: '75px'}}>Log in to your account</h1>
              <p className='text-secondary text-center pb-3'>Welcome! Please enter your details</p>
              <div id="first-page-setup">
                <Form>
                  <p class="mb-1">Email</p>
                  <Form.Item
                      name='Email'
                      // label="Email"
                      rules={[
                          {
                          required: true,
                          message: 'Email is required'
                          },
                      ]}
                  >
                  <Input id="email" placeholder="Email"/>
                  </Form.Item>
                  <p className="mt-3 mb-1">Password</p>
                  <Form.Item
                    name="password"
                    // label="Password"
                    rules={[
                    {
                        required: true,
                        message: 'Password is required',
                    },
                    ]}
                    >
                    {/* <i className='fa fa-eye showpd'/> */}
                    <Input.Password className = "mb-2"type ="password" id="password" placeholder="Password"/>

                  </Form.Item>
                  <i className='fa fa-eye showpd'/>

                  <p style={linkStyle} className = "text-end text-primary fw-semibold mb-5" onClick={() => router.push('forgetPassword')}>Forgot password?</p>
                  <div className = "d-grid gap-1" id="signin-button">
                    <Button type="primary" onClick={() => loginUser()}>Sign in</Button>
                    <Button icon={<GoogleOutlined/>} onClick={() => googleLogin()}>Sign in with Google</Button>
                    <div className="g-signin2" data-onsuccess="onSignIn"></div>
                  </div>
                </Form>
                <p className="mt-4 text-center">Don't have an account? <Link href="register" className="text-primary fw-semibold">Sign up</Link> </p>
              </div>
            </div >
        </section>
      </div>
  );
}