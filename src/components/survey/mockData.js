import { QuestionType } from './surveyTypes';
export const data = [
         {
           qsType: QuestionType.Text,
           name: "name",
           question: "Bạn tên gì?",
           required: true,
           defaultValue: "",
           options: null,
           chidQuestions: null,
         },
         {
           qsType: QuestionType.Text,
           question: "Bạn làm nghề gì?",
           name: "job",
           required: false,
           defaultValue: "",
           options: null,
           chidQuestions: null,
         },
         {
           qsType: QuestionType.MultipleChoice,
           name: "study",
           question: "Bạn học ở đâu?",
           required: true,
           options: [
             {
               label: "Đại học kinh tế",
               value: "0",
               chidQuestions: [
                 {
                   qsType: QuestionType.SignleChoice,
                   name: "major",
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
                   name: "major",
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
           defaultValue: "0",
         },
       ];