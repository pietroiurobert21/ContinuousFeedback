import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setuserData] = useState();
    
    const navigate = useNavigate();


    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/Login');
    }; 

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
        setIsLoading(false);
        setuserData(data);
        console.log(data);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        } else {
            retrieveData(token);
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
                    <button onClick={newActivity}>  Create new activity  </button>                    
                    <button onClick={logout}>  Logout  </button>                    
                </>
                    )
                }
        </div>
    )
}

export default Teacher