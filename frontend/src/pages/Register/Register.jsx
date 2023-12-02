import { useNavigate } from 'react-router-dom'
import styles from '../Home/Home.module.css';   
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const register = async () => {
        if (password !== confirmPassword) {
            alert("Password and confirm password does not match");
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

        alert(response.message)

        if (response.success) {
            navigate('/Teacher');
        }
    };

    return (
        <>
            <p> Email: <input type="text" name="email" onChange={(e)=>{setEmail(e.target.value)}}/></p>
            <p> Password:  <input type="text" name="password" onChange={(e)=>{setPassword(e.target.value)}}/></p>
            <p> Confirm password:  <input type="text" name="cfpassword" onChange={(e)=>{setConfirmPassword(e.target.value)}}/></p>

            <button className={styles.button} onClick={register}> Register </button>
        </>
    );
};

export default Login;