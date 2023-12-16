import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from './Teacher.module.css';
import ActivityListItem from '../../components/ActivityListItem/ActivityListItem';

const Teacher = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setuserData] = useState();
    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();


    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/Login');
    }; 

    const retrieveUserData = async (token) => {
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
        setIsLoading(false);
        setuserData(data);
        console.log(data);
    };

    const retrieveActivities = async (token) => {
        const activities = await fetch('http://localhost:3000/my-activities', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        }) 
        if (!activities.ok) {
            console.log('Failed to retrieve activities');
            return
        }
        const data = await activities.json();
        setActivities(data);
        console.log(data)
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        } else {
            retrieveUserData(token);
            retrieveActivities(token);
        }
    }, []);


    const newActivity = async () => {
        // TODO: create new activity
        navigate('/Activity');
    };

    return (
        <div>
                { 
                    isLoading ? ( <p> Loading... </p> ) : (     
                <>
                    <p> User email: {userData.email} </p> 
                    
                    <div className={style.activitiesContainer}>
                        <ActivityListItem
                                    id={"ID"}
                                    nume={"NAME"}
                                    cod={"CODE"}
                                    emoji_1={"EMOJI 1"}
                                    emoji_2={"EMOJI 2"}
                                    emoji_3={"EMOJI 3"}
                                    emoji_4={"EMOJI 4"}
                                />
                        {activities.length === 0 && <p> You have no activities </p>}
                        {
                            activities.map((activity, index) => (
                                <ActivityListItem
                                    key={index}
                                    id={activity.id}
                                    nume={activity.name}
                                    cod={activity.code}
                                    emoji_1={activity.emoji_1_count}
                                    emoji_2={activity.emoji_2_count}
                                    emoji_3={activity.emoji_3_count}
                                    emoji_4={activity.emoji_4_count}
                                />
                            ))
                        }
                    
                    </div>
                    
                    <button onClick={newActivity}>  Create new activity  </button>                    
                    <button onClick={logout}>  Logout  </button>             
                </>
                    )
                }
        </div>
    )
}

export default Teacher