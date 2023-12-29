import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

import style from '../Login/Login.module.css';
import backgroundImg from '../../assets/background.jpg';

import { Button, TextInput, toaster } from 'evergreen-ui';

const Home = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    const join = async () => {
        const activity = await fetch(`http://localhost:3000/activity/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const activityData = await activity.json();

        if (activity.status !== 200) {
            toaster.danger('Failed to join activity', {description: activityData.message});
            return;
        } else if (!activityData.isActive) {
            toaster.danger('Failed to join activity', {description: "Activity is not active"});
        } else {
            toaster.success('Successfully joined activity');
            navigate('/Student', { state: { activityData } });
        }
    };

    return (
        <>
            <img src={backgroundImg} id={style.background}/>
            <div className={style.loginCard}>
                <h2> Continuous Feedback </h2>
                <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Activity Code" onChange={(e)=>setCode(e.target.value)}/>

                <Button style={{width: "40vh", marginBottom: "0"}} appearance='primary' intent='success' onClick={join}> Join </Button>

                <p> create your own class for free <a href="" onClick={() => navigate("/Login")}> here </a> </p>
            </div>
        </>
    );
};

export default Home;
