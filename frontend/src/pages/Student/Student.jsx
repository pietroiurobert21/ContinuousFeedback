import { useLocation } from "react-router-dom"

import Emote from "../../components/Emote/Emote"
import styles from './Student.module.css'

const Student = () => {
    const location = useLocation()
    const activityData = location.state.activityData

    return (
        <>
        <p> {activityData.id}  {activityData.name} {activityData.code} </p>

        <div className={styles.emoteGrid}>
            <Emote emote="😀" color="aliceblue"/>
            <Emote emote="🙁" color="aliceblue"/>
            <Emote emote="😲" color="red"/>
            <Emote emote="😵" color="red"/>
        </div>
        </>
    )
}

export default Student