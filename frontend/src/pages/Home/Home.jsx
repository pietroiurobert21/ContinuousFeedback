import styles from './Home.module.css';
import styles2 from '../../index.module.css';
import styles3 from '../../App.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const join = async () => {
        const activity = await fetch(`http://localhost:3000/activity/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const activityData = await activity.json();
        if (!activity.ok) {
            console.log('Failed to join activity');
            return
        }
        navigate('/Student', {state: {activityData}})
    }

    return (
        <>
            <p> CODE:  <input type="text" name="code" onChange={(e)=>{setCode(e.target.value)}}/></p>
            <button className={styles.button} onClick={join}> Join </button>

            <p> create your own class for free <a href="" onClick={()=>navigate("/Login")}> here </a> </p>
        </>
    );
};

export default Home;