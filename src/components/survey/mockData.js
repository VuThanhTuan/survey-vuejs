import { QuestionType } from "./surveyTypes";
export const data = [
  {
    id: 0,
    qsType: QuestionType.Text,
    question: "Bạn tên gì?",
    required: true,
    options: null,
    chidQuestions: null,
  },
  {
    id: 1,
    qsType: QuestionType.Text,
    question: "Bạn làm nghề gì?",
    required: false,
    options: null,
    chidQuestions: null,
  },
  {
    id: 2,
    qsType: QuestionType.SignleChoice,
    question: "Bạn học ở đâu?",
    required: true,
    options: [
      {
        label: "Đại học kinh tế",
        value: "0",
        chidQuestions: [
          {
            qsType: QuestionType.SignleChoice,
            question: "Bạn học khoa nào",
            options: [
              {
                label: "Khoa công nghệ thông tin",
                value: "0",
              },
              {
                label: "Khoa kế toán",
                value: "1",
              },
            ],
          },
        ],
      },
      {
        id: 3,
        label: "Đại học bách khoa",
        value: "1",
        chidQuestions: [
          {
            qsType: QuestionType.SignleChoice,
            question: "Bạn học khoa nào",
            options: [
              {
                label: "Khoa công nghệ thông tin",
                value: "0",
              },
              {
                label: "Khoa xây dựng",
                value: "1",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    qsType: QuestionType.MultipleChoice,
    name: "xe",
    question: "Bạn đi xe gì?",
    required: true,
    options: [
      {
        label: "Đi xe máy",
        value: "0",
      },
      {
        label: "Đi ô tô",
        value: "1",
      },
      {
        label: "Đi bộ",
        value: "2",
      },
    ],
  },
];
