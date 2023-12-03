import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Activity = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        }
    }, []);

    const startNewActivity = async () => {
        console.log('start new activity')
    };

    return (
        <div>
            <input type="text" placeholder="Activity name"/>
            <p> Duration <input type="time" placeholder="Duration"/>  </p>
            <button onClick={startNewActivity}> Start activity and generate code </button>
        </div>
    );    
};

export default Activity;