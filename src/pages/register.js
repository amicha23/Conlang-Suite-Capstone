import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";
import { GoogleOutlined, UploadOutlined } from '@ant-design/icons';
import {registerUser, monitorAuthState} from "src/app/user"
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
                <img src="https://www.iths.org/resources/wp-content/sabai/sites/9/File/files/0bb1f4cb5ff99dd034602ced0e2534fc.png" alt="test"/>
                {/* <img src="./img/eiffel.jpg"/> */}
                <h2 class="text-center">Create an account</h2>
                <div id="first-page-setup">
                    <p class="mb-1">Name</p>
                    <Input id="name" placeholder="Name"/>
                    <p class="mb-1">Email</p>
                    <Input id="email" placeholder="Email"/>
                    <p class="mt-3 mb-1">Password</p>
                    <Input className = "mb-2"type ="password" id="password" placeholder="Password"/>
                    <i className='fa fa-eye showpd'/>
                    <p onClick={() => resetPassword()} className = "text-end text-primary fw-semibold mb-5">Forgot password?</p>
                    <div className = "d-grid gap-1" id="signin-button">
                    <Button type="primary" onClick={() => loginUser()}>Sign in</Button>
                    <Button icon={<GoogleOutlined/>}>Sign in with Google</Button>
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                    <p class="mt-4 text-center">Already have an account? <span className="text-primary fw-semibold">Sign in</span> </p>
                </div>              
                </div >
            </section>
            {/* <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Button with data-bs-target
            </button> */}
            <div class="offcanvas offcanvas-start show" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasLabel">LangTime Studio</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <nav id="sidebar">
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="option1" id="flexRadioDefault1" onchange="ShowHideDiv(this, 'winter')"/>
                            <label class="form-check-label" for="flexRadioDefault1">
                                Your Details <br /> Enter name, email, password
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="option2"id="flexRadioDefault2" onchange="ShowHideDiv(this, 'summer')"/>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Dictionary Setup <br /> Describe your conlang
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" value="option3" id="flexRadioDefault3" onchange="ShowHideDiv(this, 'spring')"/>
                            <label class="form-check-label" for="flexRadioDefault3">
                                Dictionary Setup <br /> Select you dictionary fields
                            </label>
                        </div>                        
                    </nav>
                </div>
            </div>
            {/* <!-- For Winter --> */}
            <div class="hidden" id="winter">
                <p>Text come here  for winter</p>
            </div>


            {/* <!-- For Summer --> */}
            <div class="hidden" id="summer">
                <p>Text come here for summer</p>
            </div>


            {/* <!-- For Spring --> */}
            <div class="hidden" id="spring">
                <p>Text come here for spring</p>
            </div>
        </div>
    );
}