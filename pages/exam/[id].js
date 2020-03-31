import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Body from "../../components/Layout/Body/Body";
import Header from "../../components/Layout/Header/Header";
import ExamSection from "../../components/Layout/ExamPage/ExamSection/ExamSection";
import QuestionsSection from "../../components/Layout/ExamPage/QuestionsSection/QuestionsSection";
import QuestionFormDialog from "../../components/Layout/ExamPage/QuestionFormDialog/QuestionFormDialog";
import Button from "../../components/UI/Button/Button";

import dummyExam from "../../dummy-data/exams";
import dummyQuestion from "../../dummy-data/questions";
import dummyAnswer from "../../dummy-data/answers";

import styles from "./exam.module.css";

const EditExam = props => {
    // state
    const [exam, setExam] = useState({
        id: null,
        title: "",
        readonly: false
    });
    const [questions, setQuestions] = useState(null);
    const [displayDialog, setDisplayDialog] = useState(false);
    const [targetQuestion, setTargetQuestion] = useState(null);

    const router = useRouter();
    const { id: examId } = router.query;
    const createMode = examId === "create";

    const currentExam = dummyExam.find(item => item.id == examId);
    const tmpQuestions = dummyQuestion.reduce((prvQuestions, question) => {
        if (question.exam == examId) {
            question.answers = dummyAnswer.filter(
                answer => answer.question === question.id
            );
            return prvQuestions.concat(question);
        }
    }, []);

    useEffect(() => {
        if (exam.id === null && currentExam) {
            setExam({ ...currentExam, readonly: true });
        }
        if (questions === null && tmpQuestions) {
            setQuestions(tmpQuestions);
        }
    });

    // events
    const handleChangeExamName = e => {
        const title = e.target.value;
        setExam(prevState => ({ ...prevState, title }));
    };
    const handleAllowChangeExam = () => {
        setExam(prevState => ({ ...prevState, readonly: false }));
    };
    const handleRemoveQuestion = questionIndex => {
        if (confirm("Bạn có chắc chắn muốn xóa câu hỏi này không?")) {
            setQuestions(prevState =>
                prevState.filter((item, index) => index !== questionIndex)
            );
        }
    };
    const handleMoveQuestion = (questionIndex, action = "up") => {
        setQuestions(prevState => {
            if (
                (action === "up" && questionIndex === 0) ||
                (action === "down" && questionIndex + 1 === prevState.length)
            ) {
                return prevState;
            }

            // change the position
            const newState = [...prevState];
            const tmp = newState[questionIndex];
            if (action === "up") {
                newState[questionIndex] = newState[questionIndex - 1];
                newState[questionIndex - 1] = tmp;
            } else {
                newState[questionIndex] = newState[questionIndex + 1];
                newState[questionIndex + 1] = tmp;
            }
            return newState;
        });
    };
    const handleOpenDialog = (question = null) => {
        setDisplayDialog(true);
        if (question === null) {
            // a empty question with 4 empty answer
            setTargetQuestion({
                id: null,
                title: "",
                content: "",
                type: 1,
                answer: null,
                errors: {
                    title: "",
                    content: "",
                    answer: ""
                },
                answers: [
                    { id: null, content: "", type: 1, error: "" },
                    { id: null, content: "", type: 1, error: "" },
                    { id: null, content: "", type: 1, error: "" },
                    { id: null, content: "", type: 1, error: "" }
                ]
            });
        } else {
            const target = { ...question };
            target.errors = {
                title: "",
                content: "",
                answer: ""
            };
            for (const key in target.answers) {
                if (target.answers.hasOwnProperty(key)) {
                    target.answers[key].error = "";
                }
            }
            setTargetQuestion(target);
        }
    };
    const handleChangeQuestion = ({ title, content, answer }) => {
        if (title !== undefined) {
            setTargetQuestion(prevState => ({ ...prevState, title }));
        }
        if (content !== undefined) {
            setTargetQuestion(prevState => ({ ...prevState, content }));
        }
        if (answer !== undefined) {
            setTargetQuestion(prevState => ({ ...prevState, answer }));
        }
    };
    const handleChangeAnswer = ({ index, content }) => {
        setTargetQuestion(prevState => {
            const newState = { ...prevState };
            newState.answers[index].content = content;
            return newState;
        });
    };
    const handleAddAnswer = () => {
        setTargetQuestion(prevState => {
            const newState = { ...prevState };
            newState.answers.push({
                id: null,
                content: "",
                type: 1,
                error: ""
            });
            return newState;
        });
    };
    const handleRemoveAnswer = index => {
        setTargetQuestion(prevState => {
            const newState = { ...prevState, answers: [] };
            const removedAnswerId = prevState.answers[index].id;
            if (
                (removedAnswerId === null && newState.answer === index) ||
                newState.answer === removedAnswerId
            ) {
                newState.answer = null;
            }
            newState.answers = prevState.answers.filter(
                (item, key) => key !== index
            );
            return newState;
        });
    };
    const validation = callback => {
        setTargetQuestion(prevState => {
            let hasError = false;
            const newState = { ...prevState };
            newState.errors.title = newState.errors.content = newState.errors.answer =
                "";
            if (newState.title.trim() === "") {
                hasError = true;
                newState.errors.title = "Chưa nhập mục tiêu câu hỏi";
            }
            if (newState.content.trim() === "") {
                hasError = true;
                newState.errors.content = "Chưa nhập nội dung câu hỏi";
            }
            if (newState.answer === null) {
                hasError = true;
                newState.errors.answer = "Chưa chọn đáp án";
            }
            if (!newState.answers || newState.answers.length < 2) {
                hasError = true;
                newState.errors.answer = "Câu hỏi phải có ít nhất 2 đáp án";
            }
            for (const index in newState.answers) {
                if (newState.answers[index].content.trim() === "") {
                    hasError = true;
                    newState.answers[index].error = "Chưa nhập nội dung đáp án";
                } else {
                    newState.answers[index].error = "";
                }
            }
            if (callback) {
                callback(hasError);
            }
            return newState;
        });
    };
    const handleSaveQuestion = () => {
        const saveProcess = hasError => {
            if (!hasError) {
                const newQuestion = { ...targetQuestion };
                delete newQuestion.errors;
                for (const key in newQuestion.errors) {
                    if (newQuestion.errors.hasOwnProperty(key)) {
                        delete newQuestion.errors[key].error;
                    }
                }
                setQuestions(prevState => {
                    return prevState === null
                        ? [newQuestion]
                        : [...prevState].push(newQuestion);
                });
                setDisplayDialog(false);
                setTargetQuestion(null);
            }
        };
        validation(saveProcess);
    };

    if (!exam && !createMode) return null;
    return (
        <Body>
            <Header
                title={createMode ? "Tạo đề  thi" : "Thông tin đề thi"}
                addClass={styles.header}
            />

            <div className={styles.buttons}>
                {createMode ? null : (
                    <Button title="Xóa đề thi" color="danger" />
                )}
                <Button
                    title="Thêm câu hỏi"
                    color="secondary"
                    clicked={handleOpenDialog.bind(this, null)}
                />
                <Button title="Lưu đề thi" color="success" />
            </div>

            <ExamSection
                exam={exam}
                onAllowChange={handleAllowChangeExam}
                onChangeName={handleChangeExamName}
            />

            <QuestionsSection
                questions={questions}
                onRemoveQuestion={handleRemoveQuestion}
                onMoveQuestion={handleMoveQuestion}
                onOpenDialog={handleOpenDialog}
            />

            {!displayDialog || !targetQuestion ? null : (
                <QuestionFormDialog
                    question={targetQuestion}
                    onClose={setDisplayDialog.bind(this, false)}
                    onChangeQuestion={handleChangeQuestion}
                    onChangeAnswer={handleChangeAnswer}
                    onAddAnswer={handleAddAnswer}
                    onRemoveAnswer={handleRemoveAnswer}
                    onSave={handleSaveQuestion}
                />
            )}
        </Body>
    );
};

export default EditExam;
