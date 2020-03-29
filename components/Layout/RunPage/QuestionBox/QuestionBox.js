import styles from './QuestionBox.module.css'

const QuestionBox = props => {
    const isRight = props.answered === null ? null : props.answered === props.data.answer

    let containerStyles = [styles.QuestionBox]
    if (isRight !== null) {
        containerStyles = isRight ? containerStyles.concat(styles.right) : containerStyles.concat(styles.wrong)
    }
    containerStyles = props.addClass ? containerStyles.concat(props.addClass) : containerStyles

    return (
        <div className={containerStyles.join(' ')}>
            <div className={styles.header}>
                <p>Câu hỏi số  {props.seq}</p>
            </div>

            <div className={styles.body}>

                <p className={styles.title}>{props.data.title}</p>
                <p style={{lineHeight: '1.3'}}>
                    <span style={{marginRight: '30px', color: '#007bff'}}>Câu hỏi:</span>
                    <b>{props.data.content}</b>
                </p>

                <div className={styles.answersContainer}>

                    {props.data.answers.map((answerData, aIndex) => {
                        const useStyles = [styles.answer]

                        if (props.answered !== null) {
                            // the user has answered
                            if (props.data.answer === answerData.id) {
                                // active right for right question
                                useStyles.push(styles.aRight)
                            }
                            else if (props.answered === answerData.id) {
                                // active wrong when your answer is wrong
                                useStyles.push(styles.aWrong)
                            }
                        }
                        else if (props.selected === answerData.id) {
                            // the user has NOT answered
                            useStyles.push(styles.aActive)
                        }

                        return (
                            <div key={answerData.id} className={useStyles.join(' ')}>
                                <input
                                    type="radio"
                                    name="answer"
                                    value={answerData.id}
                                    id={answerData.id}
                                    selected={answerData.id === props.selected}
                                    onChange={props.changed.bind(this, answerData.id)} />

                                <label htmlFor={answerData.id}>
                                    <span className={styles.answerLabel}>{String.fromCharCode(65 + aIndex)}</span>
                                    {answerData.content}
                                </label>
                            </div>
                        )
                    })}

                </div>

            </div>

        </div>
    )
}

export default QuestionBox