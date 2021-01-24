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
      },
      {
        qsType: QuestionType.Text,
        question: "Bạn làm nghề gì?",
        required: false,
        options: null,
      },
      {
        qsType: QuestionType.SignleChoice,
        question: "Bạn học ở đâu?",
        required: true,
        options: [
          {
            label: "Đại học kinh tế",
            chidQuestions: [
              {
                qsType: QuestionType.SignleChoice,
                question: "Bạn học khoa nào",
                options: [
                  {
                    label: "Khoa công nghệ thông tin",
                  },
                  {
                    label: "Khoa kế toán",
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
                  },
                  {
                    label: "Khoa xây dựng",
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
          },
          {
            label: "Đi ô tô",
          },
          {
            label: "Đi bộ",
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
          },
          {
            label: "2 năm",
          },
          {
            label: "3 năm trở lên",
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
          },
          {
            label: "Reactjs",
          },
          {
            label: "Vuejs",
          },
        ],
      },
    ]   
  }
]