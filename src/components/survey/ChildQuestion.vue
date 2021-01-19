<template>
  <div class="child-question-container">
    <div
      class="question-container"
      v-for="item in questions"
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
            <input
              type="checkbox"
              v-bind:name="item.name"
              v-model="option.value"
              v-bind:id="`${item.name}${option.value}`"
            />
            <label v-bind:for="`${item.name}${option.value}`">
              {{ option.label }}</label
            >

             <child-question v-if="option.chidQuestions" :questions="option.chidQuestions">
            </child-question>
          </div>
        </div>

        <div v-if="item.qsType === types.SignleChoice">
          <div v-for="option in item.options" :key="option.value">
            <input
              type="checkbox"
              v-bind:name="item.name"
              v-model="option.value"
              v-bind:id="`${item.name}${option.value}`"
            />
            <label v-bind:for="`${item.name}${option.value}`">
              {{ option.label }}</label
            >

             <child-question v-if="option.chidQuestions" :questions="option.chidQuestions">
            </child-question>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QuestionType } from "./surveyTypes";
export default {
  name: "child-question",
  props: {
    questions: {
      type: Array,
      required: false,
    },
  },
  data: function() {
    return {
      types: QuestionType,
    };
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
