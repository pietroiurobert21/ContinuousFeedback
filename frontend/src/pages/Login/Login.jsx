import { useNavigate } from 'react-router-dom'
import styles from '../Home/Home.module.css';   
import { useState } from 'react';

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
        console.log(response.success);

        if (response.success) {
            const token = response.token;
            localStorage.setItem('token', token);
            navigate('/Teacher');
        }
    };


    return (
        <>
            <p> Email: <input type="text" name="name" onChange={(e)=>setEmail(e.target.value)}/></p>
            <p> Password:  <input type="text" name="code" onChange={(e)=>setPassword(e.target.value)}/></p>

            <button className={styles.button} onClick={login}> Login </button>
            <button className={styles.button} onClick={()=>{navigate('/Register')}}> Register </button>
        </>
    );
};

export default Login;