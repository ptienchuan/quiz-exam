import { useState } from 'react'

import Body from '../../components/Layout/Body/Body'
import Header from '../../components/Layout/Header/Header'
import ExamSection from '../../components/Layout/ExamPage/ExamSection/ExamSection'
import QuestionsSection from '../../components/Layout/ExamPage/QuestionsSection/QuestionsSection'
import Button from '../../components/UI/Button/Button'

import dummyQuestions from '../../dummy-data/questions'
import dummyAnswers from '../../dummy-data/answers'

import styles from './exam.module.css'

const CreateExam = props => {
    // state
    const [exam, setExam] = useState({
        id: null,
        title: "",
        readonly: false
    })
    const [questions, setQuestions] = useState([])

    // events
    const handleChangeExamName = (e) => {
        setExam(e.target.value)
    }

    return (
        <Body>
            <Header title="Tạo đề thi" addClass={styles.header}/>

            <div className={styles.buttons}>
                <Button title="Thêm câu hỏi" color="secondary"/>
                <Button title="Lưu đề thi" color="success"/>
            </div>

            <ExamSection
                exam={exam}
                onChangeName={handleChangeExamName} />

            <QuestionsSection
                questions={questions} />
        </Body>
    )
}

export default CreateExam