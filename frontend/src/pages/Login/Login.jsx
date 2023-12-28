import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import style from './Login.module.css';
import backgroundImg from '../../assets/background.jpg';

import { Button, TextInput, toaster } from 'evergreen-ui';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const login = async () => {
        const data = await fetch('http://localhost:3000/Login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        }).catch((err) => console.log(err));

        const response = await data.json()

        if (data.status == 200) {
            toaster.success('Logged in successfully', {
                description: 'Welcome back!',
                duration: 1.5
            });
            const token = response.token;
            localStorage.setItem('token', token);
            navigate('/Teacher');
        } else {
            toaster.danger('Login failed', {
                description: response.message,
                duration: 1.5
            });
        }
    };


    return (
        <>
            <img src={backgroundImg} id={style.background}/>
            <div className={style.loginCard}>

                <h5> Login </h5>
                <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <TextInput style={{width: "40vh"}} placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
            
                <Button style={{width: "40vh", marginBottom: "0"}} appearance='primary' intent='success' onClick={login}> Login </Button>
                <Button style={{width: "40vh"}} appearance='default' intent='success' onClick={()=>{navigate('/Register')}}> Register </Button>
            </div>
        </>
    );
};

export default Login;