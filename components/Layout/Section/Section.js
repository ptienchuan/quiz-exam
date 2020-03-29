import styles from './Section.module.css'

const Section = props => (
    <div className={styles.Section}>
        {props.children}
    </div>
)

export default Section