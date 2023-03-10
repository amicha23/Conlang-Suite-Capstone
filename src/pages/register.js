import React, { useEffect, useState} from 'react';
import { Button, Input } from "antd";

export default function register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const saveUserInfo = () => {
        // WRITE CODE TO SAVE USER INFORMATION IN BACKEND
    }

    return (
        <div>
            <h1>Register for an account</h1>
            <Input placeholder="Username" onChange={e => { setUsername(e.currentTarget.value);}}/>
            <Input placeholder="Email" onChange={e => { setEmail(e.currentTarget.value);}}/>
            <Input placeholder="Password" onChange={e => { setPassword(e.currentTarget.value);}}/>
            <Button type="primary" onClick={ saveUserInfo }>Create Account</Button>
        </div>
    );
}