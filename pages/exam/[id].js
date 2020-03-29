import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import Body from '../../components/Layout/Body/Body'
import Header from '../../components/Layout/Header/Header'
import ExamSection from '../../components/Layout/ExamPage/ExamSection/ExamSection'
import QuestionsSection from '../../components/Layout/ExamPage/QuestionsSection/QuestionsSection'
import Button from '../../components/UI/Button/Button'

import dummyExam from '../../dummy-data/exams'
import dummyQuestion from '../../dummy-data/questions'
import dummyAnswer from '../../dummy-data/answers'

import styles from './exam.module.css'

const EditExam = props => {
    // state
    const [exam, setExam] = useState(null)
    const [questions, setQuestions] = useState(null)

    const router = useRouter()
    const { id:examId } = router.query
    const currentExam = dummyExam.find(item => item.id == examId)
    const tmpQuestions = dummyQuestion.reduce((prvQuestions, question) => {
        if (question.exam == examId) {
            question.answers = dummyAnswer.filter(answer => answer.question === question.id)
            return prvQuestions.concat(question)
        }
    }, [])

    useEffect(() => {
        if (exam === null && currentExam) {
            setExam({...currentExam, readonly: true})
        }
        if (questions === null && tmpQuestions) {
            setQuestions(tmpQuestions)
        }
    })

    // events
    const handleAllowChangeExam = () => {
        setExam(prevState => ({...prevState, readonly: false}))
    }
    const handleRemoveQuestion = (questionId) => {
        if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) {
            setQuestions(prevState => prevState.filter(item => item.id !== questionId))
        }
    }
    const handleMoveQuestion = (questionId, action="up") => {
        setQuestions(prevState => {
            // find the index of the question
            const index = prevState.findIndex(item => item.id === questionId)
            if ( (action === 'up' && index === 0) || (action === 'down' && (index+1) === prevState.length) ) {
                return prevState;
            }

            // change the position
            const newState = [...prevState]
            const tmp = newState[index]
            if (action === 'up') {
                newState[index] = newState[index-1]
                newState[index-1] = tmp
            } else {
                newState[index] = newState[index+1]
                newState[index+1] = tmp
            }
            return newState
        })
    }

    if (!exam) return null
    return (
        <Body>
            <Header title="Thông tin đề thi" addClass={styles.header}/>

            <div className={styles.buttons}>
                <Button title="Xóa đề thi" color="danger"/>
                <Button title="Thêm câu hỏi" color="secondary"/>
                <Button title="Lưu đề thi" color="success"/>
            </div>

            <ExamSection
                exam={exam}
                onAllowChange={handleAllowChangeExam} />

            <QuestionsSection
                questions={questions}
                onRemoveQuestion={handleRemoveQuestion}
                onMoveQuestion={handleMoveQuestion}
                />
        </Body>
    )
}

export default EditExam