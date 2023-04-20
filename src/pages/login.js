// import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Input } from 'antd';
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { React } from "react";
import { Layout } from 'antd';
import { db, auth } from "firebaseConfig/firebaseAdmin";
import { getDatabase, ref, set } from 'firebase/database';
import { loginUser, googleLogin, resetPassword } from "src/app/user"
import { CheckCircleOutlined, CheckCircleTwoTone, InfoCircleOutlined, InfoCircleTwoTone } from '@ant-design/icons'; // icons
import { useRouter } from 'next/router';

function writeUserData(userId, name, email) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
  });
}

const { Header, Footer, Sider, Content } = Layout;
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

const linkStyle = {
  pointerEvents: 'auto',
  cursor: 'pointer',
}

export default function login() {
  const router = useRouter();
  return (
    
      <div className="container">
        <section className="d-flex justify-content-center" >
            <div /* </Layout>style={{ padding: '0 20px', background: 'white'}}*/>
              <img src="/img/langtime_studio_logo-transformed.png" alt="langtime logo"/>

              <h1 style={{marginLeft: '75px'}}>Log in to your account</h1>
              <p className='text-secondary text-center pb-3'>Welcome! Please enter your details</p>
              <div id="first-page-setup">
                <p className="mb-1">Email</p>
                <Input id="email" placeholder="Email"/>
                <p className="mt-3 mb-1">Password</p>
                <Input className = "mb-2"type ="password" id="password" placeholder="Password"/>
                <i className='fa fa-eye showpd'/>

                <p className = "text-end text-primary fw-semibold mb-5" style={{  pointerEvents: 'auto',
  cursor: 'pointer'}} onClick={() => router.push('forgetPassword')}>Forgot password?</p>
                
                <div className = "d-grid gap-1" id="signin-button">
                  <Button type="primary" onClick={() => loginUser()}>Sign in</Button>
                  <Button icon={<GoogleOutlined/>} onClick={() => googleLogin()}>Sign in with Google</Button>
                  <div className="g-signin2" data-onsuccess="onSignIn"></div>
                </div>

                <p className="mt-4 text-center">Don't have an account? <Link href="register" className="text-primary fw-semibold">Sign up</Link> </p>
               

              </div>              
            </div >
        </section>
      </div>
      
  );
}