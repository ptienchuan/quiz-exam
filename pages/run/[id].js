import { useState } from 'react'
import { useRouter } from 'next/router'

import styles from './run.module.css'

import QuestionBox from '../../components/Layout/RunPage/QuestionBox/QuestionBox'
import QuestionLabel from '../../components/Layout/RunPage/QuestionLabel/QuestionLabel'
import StatisticItem from '../../components/Layout/RunPage/StatisticItem/StatisticItem'
import Header from '../../components/Layout/Header/Header'

import Button from '../../components/UI/Button/Button'
import IconButton from '../../components/UI/IconButton/IconButton'
import Message from '../../components/UI/Message/Message'

import dummyQuestion from '../../dummy-data/questions'
import dummyAnswer from '../../dummy-data/answers'
import dummyExam from '../../dummy-data/exams'


const Run = () => {
    // states
    const [started, setStarted] = useState(false)
    const [doQuestion, setDoQuestion] = useState({
        index: 0,
        selected: 0
    })
    const [yourAnswers, setYourAnswers] = useState([])
    const [isFullScreen, setFullScreen] = useState(false)

    // get query from url
    const router = useRouter()
    const { id:examId } = router.query
    const currentExam = dummyExam.find(item => item.id == examId)

    // combine dummy data
    const questions = dummyQuestion.reduce((prvQuestions, question) => {
        if (question.exam == examId) {
            question.answers = dummyAnswer.filter(answer => answer.question === question.id)
            return prvQuestions.concat(question)
        }
    }, [])

    // events
    const handleStart = () => {
        setStarted(!started)
    }
    const handleNextQuestion = () => {
        const numOfQuestions = questions.length
        if (doQuestion.index < numOfQuestions - 1) {
            setDoQuestion(prevState => {
                const newState = {...prevState, index: prevState.index+1, selected: 0}
                return newState
            })
        }
    }
    const handlePreviousQuestion = () => {
        if (doQuestion.index > 0) {
            setDoQuestion(prevState => {
                const newState = {...prevState, index: prevState.index-1, selected: 0}
                return newState
            })
        }
    }
    const handleSelectQuestion = (index) => {
        setDoQuestion({index, selected: 0})
    }
    const handleSelectAnswer = (answerId) => {
        setDoQuestion(prevState => {
            const newState = {...prevState, selected: answerId}
            return newState
        })
    }
    const handleSubmit = () => {
        if (doQuestion.selected !== 0) {
            const doingQuestionData = questions[doQuestion.index]
            setYourAnswers(prevState => {
                const hasNoAnswer = prevState.every(item => item.questionId !== doingQuestionData.id)
                // if the question has been set answer, don't do that again
                if (hasNoAnswer) {
                    const newState = [...prevState]
                    newState.push({
                        questionId: doingQuestionData.id,
                        answerId: doQuestion.selected
                    })
                    return newState
                }
                return prevState
            })
        }
    }
    const handleReset = () => {
        setDoQuestion({
            index: 0,
            selected: 0
        })
        setYourAnswers([])
        setStarted(false)
    }
    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen()
        } else {
            document.getElementById('quizBox').requestFullscreen()
        }
        
        setFullScreen(prevState => {
            return !prevState
        })
    }
    const handleRedoQuestion = (questionId) => {
        // clear your answer
        setYourAnswers(prevState => {
            const newState = prevState.filter(item => item.questionId !== questionId)
            return newState
        })
        // clear your select
        setDoQuestion(prevState => ({...prevState, selected: 0}))
    }

    // render overview area: container button start or warning message(has no question)
    let overviewBody = null
    if (!questions) {
        overviewBody = <Message content="Đề thi này hiện không có câu hỏi !" color="danger"/>
    }
    else {
        overviewBody = <Button title="Bắt đầu" color="primary" clicked={handleStart} tooltip="Bắt đầu" />
    }
    const overview = (
        <div className={styles.topBlock}>
            {overviewBody}
        </div>
    )

    // render statistic area
    let statistic = null
    if (questions) {
        const calcPercent = (total, val) => total !== 0 ? ((val / total) * 100).toFixed() : 0
        const total = questions.length
        const notYet = total - yourAnswers.length
        let numOfTrue = 0, numOfFalse = 0
        for (const yourAnswer of yourAnswers) {
            const belongingQuestion = questions.find(question => question.id === yourAnswer.questionId)
            if (belongingQuestion.answer === yourAnswer.answerId) {
                numOfTrue++
            } else {
                numOfFalse++
            }
        }

        statistic = (
            <div className={[styles.topBlock, styles.statistic].join(' ')}>
                <StatisticItem
                    addClass={styles.statisticItem}
                    title="TỔNG"
                    value={total} />
                <StatisticItem
                    addClass={styles.statisticItem}
                    title="CHƯA LÀM"
                    value={notYet}
                    color="secondary"
                    percent={calcPercent(total, notYet)} />
                <StatisticItem
                    addClass={styles.statisticItem}
                    title="ĐÚNG"
                    value={numOfTrue}
                    color="success"
                    percent={calcPercent(total, numOfTrue)} />
                <StatisticItem
                    addClass={styles.statisticItem}
                    title="SAI"
                    value={numOfFalse}
                    color="danger"
                    percent={calcPercent(total, numOfFalse)} />
                <div className={styles.statisticItem}>
                    <Button title="Làm lại" color="primary" clicked={handleReset} tooltip="Xóa kết quả và làm lại" />
                </div>
            </div>
        )
    }


    // render body area
    let body = null
    if (started && questions) {
        const currentQuestion = questions[doQuestion.index]
        
        const questionsList = (
            <div className={styles.questionList}>
                {questions.map((question, index) => {
                    let color = 'default'
                    const answer = yourAnswers.find(item => item.questionId === question.id)
                    // if this question has had an answer
                    if (answer !== undefined) {
                        color = answer.answerId === question.answer ? 'success' : 'danger'
                    }

                    return (
                        <QuestionLabel
                            key={question.id}
                            active={index === doQuestion.index}
                            color={color}
                            clicked={handleSelectQuestion.bind(this, index)}
                            tooltip={`Chọn câu hỏi số  ${index + 1}`}
                        >
                            {index + 1}
                        </QuestionLabel>
                    )
                })}
            </div>
        )

        const answer = yourAnswers.find(item => item.questionId === currentQuestion.id)
        const questionFrame = (
            <div className={styles.questionFrame}>
                <div className={styles.questionBoxWraper}>
                    <QuestionBox
                        data={currentQuestion}
                        seq={doQuestion.index+1}
                        selected={doQuestion.selected}
                        answered={answer ? answer.answerId : null}
                        changed={answer === undefined ? handleSelectAnswer : () => {}}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <div>
                        <IconButton
                            icon="back"
                            clicked={handlePreviousQuestion}
                            disabled={doQuestion.index === 0}
                            color="primary"
                            tooltip="Câu trước" />
                        <IconButton
                            icon="forward"
                            clicked={handleNextQuestion}
                            disabled={doQuestion.index === (questions.length-1)}
                            color="primary"
                            tooltip="Câu tiếp" />
                    </div>
                    <div>
                        {answer ? null : 
                            <Button
                                title="Trả lời"
                                color="primary"
                                clicked={handleSubmit}
                                tooltip="Trả lời câu hỏi" />
                        }
                    </div>
                    <div>
                        <IconButton
                            icon="restart"
                            clicked={handleRedoQuestion.bind(this, currentQuestion.id)}
                            color="primary"
                            tooltip="Làm lại câu này" />
                        {!document.fullscreenEnabled ? null :
                            <IconButton
                                icon={isFullScreen ? "unfull" : "full"}
                                tooltip={isFullScreen ? "Thu nhỏ màn hình" : "Phóng to màn hình"}
                                color="primary"
                                clicked={handleFullScreen} />
                        }
                    </div>
                </div>
            </div>
        )

        body = (
            <>
                <div className={styles.quizBox}>
                    {questionsList}
                    {questionFrame}
                </div>
            </>
        )
    }

    return (
        <div className={styles.Run}>
            {!currentExam ? null : 
                <Header title={currentExam.title} />
            }
            <div
                className={isFullScreen ? styles.full : styles.mini}
                id="quizBox"
                style={{backgroundColor: '#fff'}}
            >
                {started ? statistic : overview}
                {body}
            </div>
        </div>
    )
}

export default Run