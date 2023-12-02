import styles from './Home.module.css';
import styles2 from '../../index.module.css';
import styles3 from '../../App.module.css';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <p> Name: <input type="text" name="name" /></p>
            <p> CODE:  <input type="text" name="code" /></p>
            <button className={styles.button}> Join </button>

            <p> create your own class for free <a href="" onClick={()=>navigate("/Login")}> here </a> </p>
        </>
    );
};

export default Home;