import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import jwt from 'jsonwebtoken';

const Teacher = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setuserData] = useState([]);
    
    const navigate = useNavigate();


    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/Login');
    }; 

    // const retrieveIdFromToken = (token) => {
    //     try {
    //         const decodedToken = jwt.verify(token, 'your-secret-key'); 
    //         return decodedToken.id;
    //     } catch (error) {
    //         console.error('Error decoding token:', error);
    //         return null;
    //     }
    // };

    const retrieveData = async () => {
        const token = localStorage.getItem('token');
        const id = retrieveIdFromToken(token);  // !!!! todo

        fetch(`http://localhost:3000/users/${id}`, {
            headers: {
                content_type: 'application/json',
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setuserData(data); setIsLoading(false);
            });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/Login');
        } else {
            retrieveData();
        }
    }, []);

    return (
        <div>
                { 
                    isLoading && <p> Loading... </p>
                }
            <button onClick={logout}>  Logout  </button>
        </div>
    )
}

export default Teacher