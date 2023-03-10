import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";

import {registerUser, monitorAuthState} from "src/app/user"
import { auth } from "firebaseConfig/firebaseAdmin";


export default function register() {

    return (
        <div>
            <h1>Register for an account</h1>
            <Input id="username" placeholder="Username"/>
            <Input id="email" placeholder="Email"/>
            <Input id="password" placeholder="Password"/>
            <Button type="primary" onClick={ () => registerUser() }>Create Account</Button>
            <script type="text/javascript"></script>
        </div>
    );
}