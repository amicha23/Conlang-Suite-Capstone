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
  textAlign: 'center',
  minHeight: 12,
  lineHeight: '12px',
  display: 'flex',
  marginTop: '30px',
  justifyContent: 'center',
  color: '#595959',
  pointerEvents: 'auto',
  cursor: 'pointer',
}

export default function forgetPassword() {
  const [emailSentView, changeemailSentView] = useState(false);
  const router = useRouter();

    return (
      <div>
        {/* view after click resend */}
        <div style={{ display: emailSentView ? 'block': 'none'}}>
          <div>
            <Content style={contentStyle} id="passwordreset1">
              <div>
                <center>
                  <img src="/img/email.png" alt="test"/>
                </center>
                <h1 id="passwordtitle">Check your email</h1>
                <p id='passwordsubtitle'className='text-secondary text-center pb-3'>We sent you a password resetlink to your email address</p>
                <div>
                  <p id='noemailreceived'className='text-secondary text-center pb-3'>Didn't receive an email?</p>
                  <p>Click to resend</p>
                </div>
                <div>            
                  <p style={returnLoginStyle} id="returnlogin" onClick={() => router.push('login')}><ArrowLeftOutlined style={{marginRight: '5px'}}/> Return to login</p>
                </div>              
              </div >
            </Content>
          </div>
        </div>


        {/* forgetpassword original view */}
        <div style={{ display: emailSentView ? 'none': 'block'}}>
          <Content style={contentStyle} id="passwordreset1">
            <div>
              <img src="/img/keyoutlined.png" alt="test"/>
              <div>
                <h1 id="passwordtitle">Forgot Password?</h1>
                <p id='passwordsubtitle'className='text-secondary text-center pb-3'>Reset by entering your email below</p>
              </div>
              <div id="first-page-setup">
                <p style={{textAlign: 'left', marginLeft: '4px'}} className="mb-1">Email</p>
                <Input style={{marginTop: '5px'}} id="email" placeholder="Email"/>
                
                <div className = "d-grid gap-1" style={{marginTop:'10px'}} id="pwreset-button">
                  <Button type="primary"  onClick={() => resetPassword(changeemailSentView)}>Reset password</Button>
                </div> 
              </div>              
              <div>            
               <p style={returnLoginStyle} id="returnlogin" onClick={() => router.push('login')}><ArrowLeftOutlined style={{marginRight: '5px'}}/> Return to login</p>
              </div> 
            </div >
          </Content>
        </div>

      </div>
    )
}
