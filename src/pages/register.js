import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";

import {registerUser, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";
import 'bootstrap/dist/css/bootstrap.css';
{/* <link rel="stylesheet" href="styles.css"></link> */}

export default function register() {

    return (
        <div>
            <h1>Register for an account</h1>
            <Input id="username" placeholder="Username"/>
            <Input id="email" placeholder="Email"/>
            <Input id="password" placeholder="Password"/>
            <Button type="primary" onClick={ () => registerUser() }>Create Account</Button>

            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Button with data-bs-target
            </button>
            <div class="offcanvas offcanvas-start show" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <nav id="sidebar">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked/>
                            <label class="form-check-label" for="flexCheckDefault">
                                Your Details <br /> Enter name, email, password
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                            <label class="form-check-label" for="flexCheckChecked">
                                Dictionary Setup <br /> Describe your conlang
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                            <label class="form-check-label" for="flexCheckChecked">
                                Dictionary Setup <br /> Select you dictionary fields
                            </label>
                        </div>
                    </nav>

                </div>
            </div>

            
        </div>
        

    );
}