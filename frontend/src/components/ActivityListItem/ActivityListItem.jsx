import style from './ActivityListItem.module.css';

const ActivityListItem = (props) => {
    return (
        <div className={style.listItem}>
            <p> {props.id} </p>
            <p> {props.nume} </p>
            <p> {props.cod} </p>
            <p> {props.emoji_1} </p>
            <p> {props.emoji_2} </p>
            <p> {props.emoji_3} </p>
            <p> {props.emoji_4} </p>
        </div>
    );
};

export default ActivityListItem;