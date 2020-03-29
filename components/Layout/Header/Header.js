import styles from './Header.module.css'

const Header = props => {
    const useStyles = props.addClass ? [styles.Header].concat(props.addClass) : [styles.Header]

    return (
        <div className={useStyles.join(' ')}>
            {props.title ? <p>{props.title}</p> : null}
        </div>
    )
}

export default Header