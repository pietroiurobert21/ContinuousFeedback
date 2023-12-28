import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [errorPopup, setErrorPopup] = useState(false);

    const join = async () => {
        const activity = await fetch(`http://localhost:3000/activity/${code}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const activityData = await activity.json();

        if (!activity.ok || !activityData.isActive) {
           alert('Failed to join activity or activity is not active');
            //setErrorPopup(true);
            return;
        }

        navigate('/Student', { state: { activityData } });
    };

    const closePopup = () => {
        setErrorPopup(false);
    };

    return (
        <>
            <p> CODE: <input type="text" name="code" onChange={(e) => { setCode(e.target.value) }} /></p>
            <button className={styles.button} onClick={join}> Join </button>

            <p> create your own class for free <a href="" onClick={() => navigate("/Login")}> here </a> </p>

            {/* {errorPopup && (
                <div className={styles.errorPopup}>
                    <p>Failed to join activity or activity is not active</p>
                    <button onClick={closePopup}>Delete notification</button>
                </div>
            )} */}
        </>
    );
};

export default Home;
