import Section from "../../Section/Section";
import Message from "../../../UI/Message/Message";
import QuestionBox from "../../RunPage/QuestionBox/QuestionBox";
import IconButton from "../../../UI/IconButton/IconButton";

import styles from "./QuestionsSection.module.css";

const QuestionsSection = props => {
    let body = null;
    if (!props.questions || !props.questions.length) {
        body = (
            <Message
                content="Đề thi này hiện chưa có câu hỏi !"
                color="danger"
            />
        );
    } else {
        body = props.questions.map((question, index) => (
            <div key={question.id ? question.id : `${index}-key`}>
                <div className={styles.buttons}>
                    <IconButton
                        color="warning"
                        icon="up"
                        clicked={props.onMoveQuestion.bind(this, index, "up")}
                    />
                    <IconButton
                        color="warning"
                        icon="down"
                        clicked={props.onMoveQuestion.bind(this, index, "down")}
                    />
                    <IconButton
                        color="warning"
                        icon="edit"
                        clicked={props.onOpenDialog.bind(this, question)}
                    />
                    <IconButton
                        color="danger"
                        icon="close"
                        clicked={props.onRemoveQuestion.bind(this, index)}
                    />
                </div>
                <QuestionBox
                    addClass={styles.QuestionsSection}
                    data={question}
                    seq={index + 1}
                    selected={question.answer}
                    answered={null}
                    changed={() => {}}
                />
            </div>
        ));
    }

    return <Section>{body}</Section>;
};

export default QuestionsSection;
