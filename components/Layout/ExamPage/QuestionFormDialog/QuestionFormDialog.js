import Backdrop from "../../../UI/Backdrop/Backdrop";
import IconButton from "../../../UI/IconButton/IconButton";
import Button from "../../../UI/Button/Button";
import Input from "../../../UI/Input/Input";
import Message from "../../../UI/Message/Message";
import styles from "./QuestionFormDialog.module.css";

const QuestionFormDialog = props => {
    return (
        <Backdrop addClass={styles.backdrop}>
            <div className={styles.QuestionFormDialog}>
                <div className={styles.header}>
                    <p>
                        {props.question.id !== null ? "Chỉnh sửa" : "Tạo"} câu
                        hỏi
                    </p>
                    <IconButton
                        icon="close"
                        color="light"
                        clicked={props.onClose}
                    />
                </div>
                <div className={styles.body}>
                    <Input
                        id="title"
                        label="Mục tiêu câu hỏi"
                        element="text"
                        placeholder="Ví dụ: Chọn đáp án đúng nhất của phép tính sau"
                        value={props.question.title}
                        onChange={e =>
                            props.onChangeQuestion({ title: e.target.value })
                        }
                        error={
                            props.question.errors.title
                                ? props.question.errors.title
                                : null
                        }
                    />
                    <Input
                        id="content"
                        label="Nội dung câu hỏi"
                        element="textarea"
                        placeholder="Ví dụ: 7 + 5 = ?"
                        value={props.question.content}
                        onChange={e =>
                            props.onChangeQuestion({ content: e.target.value })
                        }
                        error={
                            props.question.errors.content
                                ? props.question.errors.content
                                : null
                        }
                    />

                    <div className={styles.answerHeader}>
                        <div>
                            {props.question.errors.answer === "" ? null : (
                                <Message
                                    color="danger"
                                    addClass={styles.errorMessage}
                                    content={props.question.errors.answer}
                                />
                            )}
                            <p>Danh sách đáp án:</p>
                        </div>
                        <Button
                            title="Thêm đáp án"
                            color="primary"
                            clicked={props.onAddAnswer}
                        />
                    </div>

                    {props.question.answers.map((answer, index) => {
                        const id = answer.id !== null ? answer.id : index;
                        const answerStyle = [styles.answer];
                        if (props.question.answer === id) {
                            answerStyle.push(styles.aActive);
                        }
                        if (answer.error !== "") {
                            answerStyle.push(styles.answerError);
                        }

                        return (
                            <div key={id}>
                                {answer.error === "" ? null : (
                                    <Message
                                        color="danger"
                                        addClass={styles.errorMessage}
                                        content={answer.error}
                                    />
                                )}
                                <div className={answerStyle.join(" ")}>
                                    <input
                                        type="radio"
                                        name="answer"
                                        value={id}
                                        id={`${id}-radio-id`}
                                        selected={
                                            props.question.answer !== null
                                                ? props.question.answer === id
                                                : false
                                        }
                                        onChange={e =>
                                            props.onChangeQuestion({
                                                answer: id
                                            })
                                        }
                                    />
                                    <label htmlFor={`${id}-radio-id`}>
                                        <span className={styles.answerLabel}>
                                            {String.fromCharCode(65 + index)}
                                        </span>
                                    </label>
                                    <Input
                                        addclass={styles.answerInput}
                                        value={answer.content}
                                        onChange={e =>
                                            props.onChangeAnswer({
                                                index,
                                                content: e.target.value
                                            })
                                        }
                                    />
                                    <IconButton
                                        icon="close"
                                        color="danger"
                                        clicked={props.onRemoveAnswer.bind(
                                            this,
                                            index
                                        )}
                                    />
                                </div>
                            </div>
                        );
                    })}

                    <div className={styles.buttons}>
                        <Button
                            title="Lưu câu hỏi"
                            color="success"
                            clicked={props.onSave}
                        />
                    </div>
                </div>
            </div>
        </Backdrop>
    );
};

export default QuestionFormDialog;
