import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react"

import Emote from "../../components/Emote/Emote"
import styles from './Student.module.css'

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


    return (
        <>
        <p> {activityData.id}  {activityData.name} {activityData.code} </p>

        <div className={styles.emoteGrid}>
            <div onClick={()=>{increment_emoji_count(1)}}> <Emote emote="😀" color="aliceblue"/> </div>
            <div onClick={()=>{increment_emoji_count(2)}}> <Emote emote="🙁" color="aliceblue"/> </div>
            <div onClick={()=>{increment_emoji_count(3)}}> <Emote emote="😲" color="aliceblue"/> </div>
            <div onClick={()=>{increment_emoji_count(4)}}> <Emote emote="😵" color="aliceblue"/> </div>
        </div>
        </>
    )
}

export default Student