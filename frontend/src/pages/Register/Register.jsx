import { useNavigate } from 'react-router-dom'
import styles from '../Home/Home.module.css';   

const Login = () => {
    const navigate = useNavigate();

    return (
        <>
            <p> Email: <input type="text" name="name" /></p>
            <p> Password:  <input type="text" name="code" /></p>
            <p> Confirm password:  <input type="text" name="code" /></p>
            <button className={styles.button} onClick={()=>navigate("/Login")}> Register </button>
        </>
    );
};

export default Login;