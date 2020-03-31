import styles from './Message.module.css'

const Message = props => {
    const useStyles = []
    switch (props.color) {
        case "primary":
            useStyles.push(styles.primary)
            break;
        case "success":
            useStyles.push(styles.success)
            break;
        case "danger":
            useStyles.push(styles.danger)
            break;
        default:
            break;
    }

    if (props.addClass) {
        useStyles.push(props.addClass)
    }

    return (
        <p className={useStyles.join(' ')}>
            {props.content}
        </p>
    )
}

export default Message