import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Menu, Popover, Position, Button, toaster, Switch, majorScale, Tab } from 'evergreen-ui'
import { EyeOpenIcon } from 'evergreen-ui'
import { Pane, Dialog } from 'evergreen-ui'

import style from './Teacher.module.css';


const Teacher = () => {
    const [isShown, setIsShown] = useState(false);
    const [log, setLog] = useState([]);

    const [checked, setChecked] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [userData, setuserData] = useState();
    const [activities, setActivities] = useState([]);

    const navigate = useNavigate();


    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/Login');
        toaster.success('Logged out successfully', { duration: 1.5 });
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

        await retrieveActivities(token);
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

    const changeActivity = async (id) => {
        const data = await fetch(`http://localhost:3000/changeactivity/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await data.json();
        if (data.status === 200) {
            toaster.success('Activity changed successfully', { duration: 1.5 });
        } else {
            toaster.danger('Error changing activity', { description: response.message, duration: 1.5 });
        }
    };

    const getLog = async (activityId) => {
        const log = await fetch(`http://localhost:3000/activitylog/${activityId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        log.json().then(logData => {
            setLog(logData);
            console.log(logData);
        });
    }


    useEffect(() => {
        const token = localStorage.getItem('token');
        localStorage.removeItem('ID');
        if (!token) {
            navigate('/Login');
        } else {
            retrieveUserData(token);
        }
    }, [checked]);

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
                            <Table.TextHeaderCell>EM1 count</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM2 count</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM3 count</Table.TextHeaderCell>
                            <Table.TextHeaderCell>EM4 count</Table.TextHeaderCell>
                            <Table.TextHeaderCell>ACTIVE</Table.TextHeaderCell>
                            <Table.TextHeaderCell>LOGS</Table.TextHeaderCell>
                        </Table.Head>
                        <Table.Body style={{height:"65vh"}}>
                            {activities.map((activity, index) => (
                                <Table.Row key={index} isSelectable onSelect={() => {
                                    navigator.clipboard.writeText(activity.code);
                                    toaster.success('Code copied to clipboard', { duration: 1.5 });
                                }}>
                                    <Table.TextCell>{activity.id}</Table.TextCell>
                                    <Table.TextCell>{activity.name}</Table.TextCell>
                                    <Table.TextCell>{activity.code}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_1_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_2_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_3_count}</Table.TextCell>
                                    <Table.TextCell>{activity.emoji_4_count}</Table.TextCell>
                                    <Table.TextCell onClick={(e) => { e.stopPropagation()}}>
                                        <Switch checked={activity.isActive} onChange={(e) => {changeActivity(activity.id); setChecked(!checked); localStorage.setItem("activityID", activity.id)}}/>
                                    </Table.TextCell>

                                    <Table.TextCell onClick={(e) => { e.stopPropagation();}}> 
                                        <Button style={{width:"3rem", padding:"0"}}appearance="minimal" onClick={() => {setIsShown(true); getLog(activity.id)}}> <EyeOpenIcon/> </Button>
                                    </Table.TextCell>

                                 </Table.Row>
                            ))}
                                    <Dialog isShown={isShown} title="Activity log" onCloseComplete={() => setIsShown(false)} confirmLabel="Close" hasFooter={false}>
                                        <Pane height="auto">
                                            { log.length === 0 && <p> No logs yet </p>}
                                            {log.map((log, index) => (
                                                <p key={index}> 
                                               {log.date.split('T')[0]} {log.date.split('T')[1].split('.')[0]} {log.emoji === 1 && '😀'} {log.emoji === 2 && '🙁'} {log.emoji === 3 && '😲'} {log.emoji === 4 && '😵'}
                                                </p>
                                            ))}
                                        </Pane>
                                    </Dialog>
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