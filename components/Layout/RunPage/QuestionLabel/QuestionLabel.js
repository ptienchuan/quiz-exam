import styles from './QuestionLabel.module.css'

const QuestionLabel = props => {
    let useStyles = [styles.QuestionLabel]
    if (props.active === true) {
        useStyles.push(styles.active)
    }
    
    switch (props.color) {
        case 'success':
            useStyles.push(styles.success)
            break;
        case 'danger':
            useStyles.push(styles.danger)
            break;
        default:
            break;
    }

    return (
        <div
            className={useStyles.join(' ')}
            onClick={props.clicked}
            title={props.tooltip}
        >
            {props.children}
        </div>
    )
}

export default QuestionLabel