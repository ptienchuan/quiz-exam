import styles from './StatisticItem.module.css'

const StatisticItem = props => {
    const percent = !props.percent ? null : <span className={styles.percent}>({props.percent}%)</span>

    let useStyle = [styles.statisticItem]
    switch (props.color) {
        case 'secondary':
            useStyle.push(styles.secondary)
            break;
        case 'success':
            useStyle.push(styles.success)
            break;
        case 'danger':
            useStyle.push(styles.danger)
            break;
        default:
            break;
    }
    useStyle = props.addClass ? useStyle.concat(props.addClass) : useStyle

    return (
        <div className={useStyle.join(' ')}>
            <p className={styles.title}>{props.title}</p>
            <p className={styles.value}>
                {props.value}
                {percent}
            </p>
        </div>
    )
}

export default StatisticItem