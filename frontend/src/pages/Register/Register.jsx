import { useNavigate } from 'react-router-dom'
import style from '../Login/Login.module.css';
import { useState } from 'react';

import { Button, TextInput, toaster } from 'evergreen-ui';
import backgroundImg from '../../assets/background.jpg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const register = async () => {
        if (confirmPassword === '') {
            toaster.danger('Error', { description: 'Please confirm your password' })
            return;
        }
        if (password !== confirmPassword) {
            toaster.danger('Error', { description: 'Passwords do not match' })
            return;
        }

        const data = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, password: password }),
        }).catch((err) => console.log(err));
        const response = await data.json();
        
        if (response.success) {
            toaster.success('Success', { description: response.message })
            navigate('/Login');
        } else {
            toaster.danger('Error', { description: response.message })
        }
    };

    return (
        <>
            <img src={backgroundImg} id={style.background}/>
            <div className={style.loginCard}>
                <h5> Register </h5>
                <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Password" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Confirm Password" type="password" onChange={(e)=>setConfirmPassword(e.target.value)}/>
        
                <Button style={{width: "40vh", marginBottom: "0"}} appearance='primary' intent='success' onClick={register}> Register </Button>
                <Button style={{width: "40vh"}} appearance='default' intent='danger' onClick={()=>{navigate('/Login')}}> Cancel </Button>
            </div>
        </>
    );
};

export default Login;