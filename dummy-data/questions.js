const Question = require('../model/question')

module.exports = [
    new Question({
        id: 1,
        title: "Chọn kết quả của phép tính",
        content: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente necessitatibus distinctio impedit. Deserunt architecto, quasi voluptatem numquam consequatur similique ipsam quia eveniet. Blanditiis id nisi repellendus eum rem sunt harum!",
        type: 1,
        answer: 3,
        exam: 1
    }),
    new Question({
        id: 2,
        title: "Chọn kết quả của phép tính",
        content: "5 + 7 = ?",
        type: 1,
        answer: 5,
        exam: 1
    }),
    new Question({
        id: 3,
        title: "Điên số  thích hợp vào chỗ  trống",
        content: "10 - ... = 5",
        type: 1,
        answer: 10,
        exam: 1
    }),
    new Question({
        id: 4,
        title: "Điên số  thích hợp vào chỗ  trống",
        content: "10 - ... = 3",
        type: 1,
        answer: 16,
        exam: 1
    }),
    new Question({
        id: 5,
        title: "Chọn đáp án đúng nhất",
        content: "Số  10 là số có mấy chữ số?",
        type: 1,
        answer: 17,
        exam: 1
    }),
]