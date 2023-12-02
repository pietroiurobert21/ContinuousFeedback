import Emote from "../../components/Emote/Emote"
import styles from './Student.module.css'

const Student = () => {
    return (
        <div className={styles.emoteGrid}>
            <Emote emote="❤️" color="aliceblue"/>
            <Emote emote="👍" color="aliceblue"/>
            <Emote emote="🤯" color="red"/>
            <Emote emote="👎" color="red"/>
        </div>
    )
}

export default Student