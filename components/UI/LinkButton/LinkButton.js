import styles from './LinkButton.module.css'
import Link from 'next/link'

const LinkButton = props => {
    let useStyles = [styles.LinkButton]
    switch (props.color) {
        case 'primary':
            useStyles.push(styles.primary)
            break;
        case 'success':
            useStyles.push(styles.success)
            break;
        case 'warning':
            useStyles.push(styles.warning)
            break;
        default:
            break;
    }
    if (props.addClass) {
        useStyles.push(props.addClass)
    }
    return (
        <Link href={props.href}>
            <a className={useStyles.join(' ')}>{props.title}</a>
        </Link>
    )
}

export default LinkButton