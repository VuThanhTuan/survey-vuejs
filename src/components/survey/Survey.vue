<template>
  <div class="survey-container">
    <div
      class="question-container"
      v-for="(item, index) in questions"
      :key="item.question"
    >
      <div class="quetion-label">
        <div class="question-num">{{ index + 1 }}</div>
        {{ item.question }}
      </div>

      <div class="question-answer">
        <div v-if="item.qsType === types.Text">
          <label class="input-text-label">Trả lời: </label
          ><input v-bind:name="item.name" v-model="item.answer" />
        </div>

        <div v-if="item.qsType === types.SignleChoice">
          <div v-for="option in item.options" :key="option.value">
            <input
              type="checkbox"
              v-bind:name="item.name"
              v-bind:id="`${item.name}${option.value}`"
            />
            <label v-bind:for="`${item.name}${option.value}`">
              {{ option.label }}</label
            >

            <!-- <child-question v-if="option.chidQuestions" :questions="option.chidQuestions">
            </child-question> -->
          </div>
        </div>

        <div v-if="item.qsType === types.MultipleChoice">
          <div v-for="option in item.options" :key="option.value">
            <input
              type="checkbox"
              v-model="item.answer"
              v-bind:id="`${item.name}${option.value}`"
              v-bind:value="option.value"
            />
            <label v-bind:for="`${item.name}${option.value}`">
              {{ option.label }}</label
            >

            <child-question
              v-if="showChildQuestion(item, option)"
              :questions="option.chidQuestions"
            >
            </child-question>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-submit">Submit</button>
  </div>
</template>

<script>
import ChildQuestion from './ChildQuestion.vue';
import { data } from "./mockData";
import { QuestionType } from "./surveyTypes";
export default {
  components: { ChildQuestion },
  name: "Survey",
  //   props: {
  //     data: {
  //       type: Array,
  //       required: false,
  //     },
  //   },
  data: function () {
    const convertedQuestion = this.convertQuestion(data);
    return {
      types: QuestionType,
      questions: convertedQuestion,
    };
  },
  created: function () {
    // console.log("object", this.questions);
  },
  methods: {
    showChildQuestion: function (question, option) {
      if(question.qsType == QuestionType.MultipleChoice) {
        return option.chidQuestions && question.answer.includes(option.value);
      }
      return option.chidQuestions && question.answer === option.value;
    },
    convertQuestion: function (questions) {
      const convertedQuestion = questions.map((item) => {
        return {
          ...item,
          answer: item.qsType === QuestionType.Text || item.qsType === QuestionType.SignleChoice ? '' : [],
          chidQuestions: item.chidQuestions ? this.convertQuestion(item.chidQuestions) : null,
        };
      });
      return convertedQuestion;
    },
  },
};
</script>

<style scoped>
.survey-container {
  text-align: left;
  font-size: 15px;
}
.question-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.quetion-label {
  padding: 20px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 1px solid #74bde4;
  color: #0091ea;
  text-align: left;
}

.input-text-label {
  vertical-align: bottom;
  margin-right: 20px;
}

.question-num {
  width: 30px;
  height: 30px;
  line-height: 30px;
  display: inline-block;
  margin-right: 20px;
  border-radius: 50%;
  background-color: #212121;
  color: #fff;
  font-weight: bold;
  text-align: center;
}

.question-answer {
  padding: 20px;
  text-align: left;
}

.question-answer input {
  padding: 5px 8px;
  border: 1px solid #000;
  border-radius: 5px;
}

.btn-submit {
  padding: 10px;
  border: 1px solid #0091ea;
  background-color: #74bde4;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0091ea;
}
</style>
