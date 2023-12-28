import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import { Button, TextInput, toaster } from 'evergreen-ui';

import style from '../Login/Login.module.css';

const Activity = () => {
    const [activityName, setActivityName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        }
    }, []);

    const retrieveData = async (token) => {
        const userData = await fetch('http://localhost:3000/my-profile', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (!userData.ok) {
            console.log('Failed to retrieve data');
            return
        }

        const data = await userData.json();
        return data
    };


    const createNewActivity = async () => {
        const token = localStorage.getItem('token');
        const userData = await retrieveData(token);
        console.log("user data:" , userData)
        const id = userData.id;
        console.log("activity data:" , activityName)

        const response = await fetch(`http://localhost:3000/activities/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body : JSON.stringify({name: activityName})
        });
        const responseData = await response.json();

        if (response.status !== 200) {
            toaster.danger('Failed to create activity', { description: responseData.message, duration: 1.5 });
            return
        } else {
            toaster.success('Activity created successfully', { duration: 1.5 });
            navigate('/Teacher');
        }
    
    };

    return (
        <div>
            <div className={style.loginCard}>
            <h5> New activity </h5>
            <TextInput style={{width: "40vh", marginBottom: "1vh"}} placeholder="Activity Name" onChange={
                (e) => setActivityName(e.target.value)}/>

            <Button style={{width: "40vh", marginBottom: "0"}} appearance='primary' intent='success' onClick={createNewActivity}> Create a new activity </Button>
            </div>
        </div>
    );    
};

export default Activity;