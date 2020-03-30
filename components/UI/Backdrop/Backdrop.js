import styles from './Backdrop.module.css'

const Backdrop = props => {
    const useStyes = [styles.Backdrop]
    if (props.addClass) {
        useStyes.push(props.addClass)
    }

    return (
        <div className={useStyes.join(' ')}>
            {props.children}
        </div>
    )
}

export default Backdrop