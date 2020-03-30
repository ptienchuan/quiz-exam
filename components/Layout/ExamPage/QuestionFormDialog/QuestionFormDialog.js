import Backdrop from '../../../UI/Backdrop/Backdrop'
import IconButton from '../../../UI/IconButton/IconButton'
import Button from '../../../UI/Button/Button'
import Input from '../../../UI/Input/Input'
import styles from './QuestionFormDialog.module.css'

const QuestionFormDialog = props => {
    return (
        <Backdrop addClass={styles.backdrop}>
            <div className={styles.QuestionFormDialog}>
                <div className={styles.header}>
                    <p>Tạo câu hỏi</p>
                    <IconButton
                        icon="close"
                        color="light"
                        clicked={props.onClose} />
                </div>
                <div className={styles.body}>
                    <Input
                        id="title"
                        label="Mục tiêu câu hỏi"
                        element="text"
                        placeholder="Ví dụ: Chọn đáp án đúng nhất của phép tính sau" />
                    <Input
                        id="content"
                        label="Nội dung câu hỏi"
                        element="textarea"
                        placeholder="Ví dụ: 7 + 5 = ?" />
                    
                    <div className={styles.answerHeader}>
                        <p>Danh sách đáp án:</p>
                        <Button title="Thêm đáp án" color="primary" />
                    </div>

                    <div>
                        <div className={styles.answer}>
                            <input
                                type="radio"
                                name="answer"
                                value="1-answerID"
                                id="1-answerID"
                                selected={true} />
                            <label htmlFor="1-answerID">
                                <span className={styles.answerLabel}>{String.fromCharCode(65 + 0)}</span>
                            </label>
                            <Input addclass={styles.answerInput} element="text" />
                            <IconButton icon="close" color="danger" />
                        </div>


                        <div className={styles.answer}>
                            <input
                                type="radio"
                                name="answer"
                                value="1-answerID"
                                id="1-answerID"
                                selected={true} />
                            <label htmlFor="1-answerID">
                                <span className={styles.answerLabel}>{String.fromCharCode(65 + 0)}</span>
                            </label>
                            <Input addclass={styles.answerInput} element="text" />
                            <IconButton icon="close" color="danger" />
                        </div>
                        <div className={styles.answer}>
                            <input
                                type="radio"
                                name="answer"
                                value="1-answerID"
                                id="1-answerID"
                                selected={true} />
                            <label htmlFor="1-answerID">
                                <span className={styles.answerLabel}>{String.fromCharCode(65 + 0)}</span>
                            </label>
                            <Input addclass={styles.answerInput} element="text" />
                            <IconButton icon="close" color="danger" />
                        </div>
                        <div className={styles.answer}>
                            <input
                                type="radio"
                                name="answer"
                                value="1-answerID"
                                id="1-answerID"
                                selected={true} />
                            <label htmlFor="1-answerID">
                                <span className={styles.answerLabel}>{String.fromCharCode(65 + 0)}</span>
                            </label>
                            <Input addclass={styles.answerInput} element="text" />
                            <IconButton icon="close" color="danger" />
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <Button title="Lưu câu hỏi" color="success" />
                    </div>
                </div>
            </div>
        </Backdrop>
    )
}

export default QuestionFormDialog