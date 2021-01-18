<template>
  <div class="survey-container">
    <div class="question-container" v-for="item in questions" :key="item.label">
      <div class="quetion-label">
        {{ item.question }}
      </div>
      <div class="question-answer">
        <div v-if="item.qsType === types.Text">
          <input />
        </div>

        <div v-if="item.qsType === types.MultipleChoice">
          <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
          <label for="vehicle1"> I have a bike</label><br />
          <input type="checkbox" id="vehicle2" name="vehicle2" value="Car" />
          <label for="vehicle2"> I have a car</label><br />
          <input type="checkbox" id="vehicle3" name="vehicle3" value="Boat" />
          <label for="vehicle3"> I have a boat</label><br />
        </div>
      </div>
    </div>
    <button class="btn-submit">Submit</button>
  </div>
</template>

<script>
import { data } from "./mockData";
import { QuestionType } from "./surveyTypes";
export default {
  name: "Survey",
  //   props: {
  //     data: {
  //       type: Array,
  //       required: false,
  //     },
  //   },
  data: function () {
    return {
      types: QuestionType,
      questions: data,
    };
  },
};
</script>

<style scoped>
.survey-container {
  text-align: left;
}
.question-container {
  border: 1px solid #000;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 8px 8px;
}

.quetion-label {
  padding: 20px;
  font-weight: bold;
  background-color: beige;
  border-bottom: 1px solid #000;
  text-align: left;
  border-radius: 8px 8px 0px 0px;
}

.question-answer {
  padding: 20px;
  text-align: left;
}

.btn-submit {
  padding: 10px;
  border: 1px solid #000;
  border-radius: 5px;
}
</style>