import styles from './index.module.css'
import Body from '../components/Layout/Body/Body'
import ExamItem from '../components/Layout/HomePage/ExamItem/ExamItem'
import LinkButton from '../components/UI/LinkButton/LinkButton'

import dummyExams from '../dummy-data/exams'

const Home = () => {
    return (
        <Body>
            <div className={styles.header}>
                <p>Danh sách đề  thi:</p>
                <LinkButton href="/exam" title="Tạo đề  thi" color="success"/>
            </div>
            <div className={styles.examList}>
                {dummyExams.map(exam => 
                    <ExamItem key={exam.id} title={exam.title} examId={exam.id} numOfQuestion="3" />
                )}
            </div>
        </Body>
    )
}

export default Home
