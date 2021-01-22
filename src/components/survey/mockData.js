import { QuestionType } from "./surveyTypes";
export const data = [
  {
    group: 'Thông tin cá nhân',
    questions: [
      {
        qsType: QuestionType.Text,
        question: "Bạn tên gì?",
        required: true,
        options: null,
        chidQuestions: null,
      },
      {
        qsType: QuestionType.Text,
        question: "Bạn làm nghề gì?",
        required: false,
        options: null,
        chidQuestions: null,
      },
      {
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
        qsType: QuestionType.MultipleChoice,
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
    ]   
  },
  {
    group: 'Kỹ năng (Technical)',
    questions: [
      {
        qsType: QuestionType.SignleChoice,
        question: "Số năm kinh nghiệm?",
        required: true,
        options: [
          {
            label: "1 năm",
            value: "0",
          },
          {
            label: "2 năm",
            value: "1",
          },
          {
            label: "3 năm trở lên",
            value: "3",
          },
        ],
      },
      {
        qsType: QuestionType.MultipleChoice,
        question: "Library/Framework",
        required: true,
        options: [
          {
            label: "Angular",
            value: "0",
          },
          {
            label: "Reactjs",
            value: "1",
          },
          {
            label: "Vuejs",
            value: "2",
          },
        ],
      },
    ]   
  }
]