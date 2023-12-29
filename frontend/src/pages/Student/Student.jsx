import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Emote from "../../components/Emote/Emote"
import styles from './Student.module.css'

import { toaster } from 'evergreen-ui'

const Student = () => {
    const location = useLocation()
    const activityData = location.state.activityData

    const increment_emoji_count = async (emojiIndex) => {
        console.log(emojiIndex)
        const response = await fetch(`http://localhost:3000/emoji_count_incrementation/${activityData.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({emoji: emojiIndex})
        });

        const data = await response.json();
        console.log(data);
    }

    const feedback = async (emojiIndex) => {
        increment_emoji_count(emojiIndex)
        toaster.closeAll()
        toaster.success('feedback submited', {
            description: 'Thank you for your feedback!',
            duration: 1,
            id: 'feedbacks_submission'
        })
        feedbackLog(emojiIndex)
    }

    const feedbackLog = async (emojiIndex) => { 
        const currentDate = new Date()

        const data = await fetch(`http://localhost:3000/activitylog/${activityData.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: currentDate,emoji: emojiIndex})
        });
        const response = await data.json()
        if (data.status === 200) {
            console.log(response)
        } else {
            console.log(response.error)
        }
    }

    return (
        <>
        <div className={styles.container}>
            <p> ID: {activityData.id} </p>
            <p> Name: {activityData.name} </p>

            <div className={styles.emoteGrid}>
                <div onClick={()=>feedback(1)}> <Emote emote="😀" color="aliceblue"/> </div>
                <div onClick={()=>feedback(2)}> <Emote emote="🙁" color="aliceblue"/> </div>
                <div onClick={()=>feedback(3)}> <Emote emote="😲" color="aliceblue"/> </div>
                <div onClick={()=>feedback(4)}> <Emote emote="😵" color="aliceblue"/> </div>
            </div>
        </div>
        </>
    )
}

export default Student