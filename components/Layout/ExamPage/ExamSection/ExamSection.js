import Section from "../../Section/Section";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

import styles from "./ExamSection.module.css";

const ExamSection = props => {
    let body = null;
    if (!props.exam.readonly) {
        // edit mode
        body = (
            <Input
                id="examName"
                element="text"
                label="Tên đề thi:"
                placeholder="Tên đề thi"
                value={props.exam.title}
                onChange={props.onChangeName}
            />
        );
    } else {
        // view mode
        body = (
            <div className={styles.examName}>
                <Button
                    title="Sửa tên"
                    color="light"
                    clicked={props.onAllowChange}
                />
                <p>
                    <span className={styles.label}>Tên đề thi:</span>
                    <b>{props.exam.title}</b>
                </p>
            </div>
        );
    }

    return <Section>{body}</Section>;
};

export default ExamSection;
