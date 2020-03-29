import LinkButton from '../../../UI/LinkButton/LinkButton'
import styles from './ExamItem.module.css'

const ExamItem = props => {
    return (
        <div className={styles.ExamItem}>
            <div className={styles.numOfQuestion}>
                <p>{props.numOfQuestion ? props.numOfQuestion : 0} câu</p>
            </div>
            <div className={styles.title}>
                <p>{props.title}</p>
            </div>
            <LinkButton addClass={styles.button} href={`/exam/${props.examId}`} title="Sửa" color="warning"/>
            <LinkButton addClass={styles.button} href={`/run/${props.examId}`} title="Mở" color="primary"/>
        </div>
    )
}

export default ExamItem