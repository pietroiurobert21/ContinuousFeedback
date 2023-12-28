import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Menu, Popover, Position, Button, toaster } from 'evergreen-ui'

import style from './Teacher.module.css';

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
        localStorage.setItem('ID', data.id);

        setIsLoading(false);
        setuserData(data);
        console.log(data);
    };

    const retrieveActivities = async (token) => {
        const activities = await fetch(`http://localhost:3000/my-activities/${localStorage.getItem('ID')}`, {
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
        console.log(data);
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

    return (
        <div className={style.teacherContainer}>
                { 
                    isLoading ? ( <p> Loading... </p> ) : (     
                <>
                    <Popover position={Position.BOTTOM_LEFT} content={
                        <Menu>
                            <Menu.Group>
                                <Menu.Item icon="person" onSelect={() => {}}>Profile</Menu.Item>
                                <Menu.Item icon="cog" onSelect={() => {}}>Settings</Menu.Item>
                            </Menu.Group>
                            <Menu.Divider />
                            <Menu.Group>
                                <Menu.Item icon="log-out" intent="danger" onSelect={logout}>Log Out</Menu.Item>
                            </Menu.Group>
                        </Menu>
                        }>
                        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className={style.avatar}/>
                    </Popover>

                    <p> User email: {userData.email} </p> 
                    
                    <Table style={{width:"90vw", height:"70vh", paddingTop: "0"}}>
                        <Table.Head>
                            <Table.TextHeaderCell>ID</Table.TextHeaderCell>
                            <Table.TextHeaderCell>NAME</Table.TextHeaderCell>
                            <Table.TextHeaderCell>CODE</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM1</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM2</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM3</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM4</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ACTIVE</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body height={240}>
                            {activities.map((activity, index) => (
                                <Table.Row key={index} isSelectable onSelect={() => {
                                    navigator.clipboard.writeText(activity.code);
                                    toaster.success('Code copied to clipboard', { duration: 1.5 });
                                }}>
                                    <Table.TextCell width="auto">{activity.id}</Table.TextCell>
                                    <Table.TextCell>{activity.name}</Table.TextCell>
                                    <Table.TextCell>{activity.code}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_1_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_2_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_3_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_4_count}</Table.TextCell>
                                    <Table.TextCell>{activity.isActive.toString()}</Table.TextCell>
                                    <Table.TextCell isNumber>{}</Table.TextCell>
                                 </Table.Row>
                            ))}
                        </Table.Body>
                     </Table>
                    
                     <Button style={{width: "40vh", marginBottom: "0"}} appearance='primary' intent='success' onClick={()=>{navigate('/activity')}}>  Create new activity  </Button>
                </>
                    )
                }
        </div>
    )
}

export default Teacher