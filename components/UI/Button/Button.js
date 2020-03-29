import styles from './Button.module.css'

const Button = props => {
    let useStyle = [styles.Button]
    if (props.color && styles[`${props.color}Button`]) {
        useStyle.push(styles[`${props.color}Button`])
    }

    return (
        <button
            className={useStyle.join(' ')}
            disabled={props.disabled}
            onClick={props.clicked}
            title={props.tooltip}
        >
            {props.title}
        </button>
    )
}

export default Button