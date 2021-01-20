<template>
  <div class="child-question-container">
    <div
      class="question-container"
      v-for="item in convertedQuestion"
      :key="item.question"
    >
      <div class="quetion-label">
        {{ item.question }}
      </div>

      <div class="question-answer">
        <div v-if="item.qsType === types.Text">
          <label class="input-text-label">Trả lời: </label
          ><input v-bind:name="item.name" />
        </div>

        <div v-if="item.qsType === types.MultipleChoice">
          <div v-for="option in item.options" :key="option.value">
            
            <custom-checkbox :id="`${item.name}${option.value}`" :label="option.label" v-model="item.answer" :optionValue="option.value"></custom-checkbox>

             <child-question v-if="showChildQuestion(item, option)" :questions="option.chidQuestions">
            </child-question>
          </div>
        </div>

        <div v-if="item.qsType === types.SignleChoice">
          <div v-for="option in item.options" :key="option.value">
            <custom-checkbox :id="`${item.name}${option.value}`" type="single" :label="option.label" v-model="item.answer" :optionValue="option.value"></custom-checkbox>

             <child-question v-if="showChildQuestion(item, option)" :questions="option.chidQuestions">
            </child-question>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from './CustomCheckbox.vue';
import { QuestionType } from "./surveyTypes";
export default {
  components: { CustomCheckbox },
  name: "child-question",
  props: {
    questions: {
      type: Array,
      required: false,
    },
  },
  data: function () {
    const convertedQuestion = this.convertQuestion(this.questions);
    return {
      types: QuestionType,
      convertedQuestion,
    };
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
.child-question-container {
  text-align: left;
  transition: all 0.5s ease-in-out;
}
.question-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.quetion-label {
  padding: 10px;
  border-bottom: 1px solid #74bde4;
  text-align: left;
}

.input-text-label {
  vertical-align: bottom;
  margin-right: 15px;
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
</style>
