import style from './ActivityListItem.module.css';

const ActivityListItem = (props) => {
    return (
        <div className={style.listItem}>
            <p> {props.id} </p>
            <p> {props.nume} </p>
            <p> {props.cod} </p>
        </div>
    );
};

export default ActivityListItem;