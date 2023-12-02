import { useNavigate } from 'react-router-dom'
import styles from '../Home/Home.module.css';   

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <p> Email: <input type="text" name="name" /></p>
            <p> Password:  <input type="text" name="code" /></p>
            <button className={styles.button} onClick={()=>navigate("/Teacher")}> Login </button>
            <button className={styles.button} onClick={()=>navigate("/Register")}> Register </button>
        </>
    );
};

export default Login;