import { QuestionType } from './surveyTypes';
export const data = [
    {
        qsType: QuestionType.Text,
        question: 'Bạn tên gì?',
        options: null,
        chidQuestions: null,
    },
    {
        qsType: QuestionType.Text,
        question: 'Bạn làm nghề gì?',
        options: null,
        chidQuestions: null,
    },
    {
        qsType: QuestionType.MultipleChoice,
        question: 'Bạn học ở đâu?',
        options: [
            {
                label: 'Đại học kinh tế',
                value: 0,
            },
            {
                label: 'Đại học bách khoa',
                value: 1,
            }
        ],
        chidQuestions: null,
    },
]