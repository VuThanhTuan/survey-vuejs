<template>
  <div class="child-question-container">
    <div
      class="question-container"
      v-for="item in convertedQuestion"
      :key="item.question"
    >
      <div class="quetion-label">
        <span>{{ item.question }}</span>
        <i v-on:click="editChildQuestion(item)" class="fas fa-edit"></i>
      </div>

      <div class="question-answer">
        <div v-if="item.qsType === types.Text">
          <label class="input-text-label">Trả lời: </label
          ><input v-bind:name="item.name" />
        </div>

        <div v-if="item.qsType === types.MultipleChoice">
          <div v-for="option in item.options" :key="option.value">
            <custom-checkbox
              :id="`${item.name}${option.value}`"
              :label="option.label"
              v-model="item.answer"
              :optionValue="option.value"
            ></custom-checkbox>
          </div>
        </div>

        <div v-if="item.qsType === types.SignleChoice">
          <div v-for="option in item.options" :key="option.value">
            <custom-checkbox
              :id="`${item.name}${option.value}`"
              type="single"
              :label="option.label"
              v-model="item.answer"
              :optionValue="option.value"
            ></custom-checkbox>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "./CustomCheckbox.vue";
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
  computed: {
    convertedQuestion: function() {
      console.log('computed', this.questions);
      return this.convertQuestion(this.questions);
    }
  },
  data: function () {
    return {
      types: QuestionType,
    };
  },
  methods: {
    showChildQuestion: function (question, option) {
      if (question.qsType == QuestionType.MultipleChoice) {
        return option.chidQuestions && question.answer.includes(option.value);
      }
      return option.chidQuestions && question.answer === option.value;
    },
    convertQuestion: function (questions) {
      const convertedQuestion = questions.map((item, index) => {
        return {
          ...item,
          id: index,
          answer:
            item.qsType === QuestionType.Text ||
            item.qsType === QuestionType.SignleChoice
              ? ""
              : [],
        };
      });
      return convertedQuestion;
    },
    editChildQuestion: function(item) {
      console.log('test', item);
      this.$emit('edit-question', item);
    }
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
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #212121;
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

i {
  cursor: pointer;
}
</style>
