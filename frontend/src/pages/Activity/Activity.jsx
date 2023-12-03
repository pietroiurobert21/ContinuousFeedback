import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Activity = () => {
    const [activityData, setActivityData] = useState({"code": "", "name": ""});
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


    const startNewActivity = async () => {
        const token = localStorage.getItem('token');
        const userData = await retrieveData(token);
        console.log("user data:" , userData)
        const id = userData.id;
        console.log("activity data:" , activityData)

        const response = await fetch(`http://localhost:3000/activities/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body : JSON.stringify(activityData)
        });
        if (!response.ok) {
            console.log('Failed to create activity');
            return
        }
        const responseData = await response.json();
        console.log(responseData);
    };

    return (
        <div>
            <input type="text" placeholder="Activity name" onChange={
                (e) => { setActivityData(prevState=>({...prevState, name: e.target.value})) }
            }/>
            <input type="text" placeholder="Activity code" onChange={
                (e) => { setActivityData(prevState=>({...prevState, code: e.target.value})) }
            }/>
            <p> Duration <input type="time" placeholder="Duration"/>  </p>
            <button onClick={startNewActivity}> Start activity and generate code </button>
        </div>
    );    
};

export default Activity;