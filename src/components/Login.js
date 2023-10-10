// LoginPage.js
import React, { useState, useContext } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import axios from 'axios';
import UserContext from './UserContext';
import { useNavigate } from 'react-router-dom';

async function fetchUsers() {
    const response = await axios.get('https://65225df6f43b179384146c7e.mockapi.io/adminData');
    return response.data;
}

async function validateLogin(email, password) {
    const users = await fetchUsers();
    return users.find(user => user.email === email && user.password === password);
}

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUserData } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        const user = await validateLogin(email, password);
        setLoading(false);

        if (user) {
            setUserData(user);
            navigate('/dashboard');
        } else {
            setLoginStatus('Invalid credentials.');
        }
    }

    return (
        <div style={{ width: '300px', margin: '0 auto' }}>
            <h2 className='main-header'>Login</h2>
            <Form loading={loading} error={!!loginStatus}>
                <Form.Input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                />
                <Form.Input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                />
                <Button type="submit" onClick={handleLogin}>Login</Button>
                {loginStatus && <Message error header="Login Error" content={loginStatus} />}
            </Form>
        </div>
    );
}

export default Login;



