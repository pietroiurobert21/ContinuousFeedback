import styles from './Emote.module.css'

const Emote = (props) => {
    return (
        <div className={styles.emoteContainer} style={{backgroundColor: props.color}}>
            <h1> {props.emote} </h1>
        </div>
    )
}

export default Emote