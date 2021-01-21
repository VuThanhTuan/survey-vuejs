<template>
  <div class="survey-container">
    <div
      class="question-container"
      v-for="(item, index) in questions"
      :key="item.question"
    >
      <div class="quetion-label">
        <div class="question-num">{{ index + 1 }}</div>
        {{ item.question }} <span v-if="item.required" class="question-required">*</span>
        <i v-on:click="openDialog(item)" class="fas fa-edit"></i>
      </div>

      <div class="question-answer">
        <div v-if="item.qsType === types.Text">
          <label class="input-text-label">Trả lời: </label
          ><input v-bind:name="item.name" v-model="item.answer" />
        </div>

        <div v-if="item.qsType === types.SignleChoice">
          <div class="question-option" v-for="option in item.options" :key="option.value">
            <custom-checkbox
              :id="`${item.name}${option.value}`"
              type="single"
              :label="option.label"
              v-model="item.answer"
              :optionValue="option.value"
            ></custom-checkbox>
            <child-question
              v-if="showChildQuestion(item, option)"
              :questions="option.chidQuestions"
            >
            </child-question>
          </div>
        </div>

        <div v-if="item.qsType === types.MultipleChoice">
          <div class="question-option" v-for="option in item.options" :key="option.value">
            <custom-checkbox
              :id="`${item.name}${option.value}`"
              :label="option.label"
              v-model="item.answer"
              :optionValue="option.value"
            ></custom-checkbox>
            <child-question
              v-if="showChildQuestion(item, option)"
              :questions="option.chidQuestions"
            >
            </child-question>
          </div>
        </div>
      </div>
    </div>
    <button class="btn-submit">Thêm Câu Hỏi</button>
    <div v-if="showDialog" class="cts-dialog-container">
      <div class="cts-dialog-backdrop"></div>
      <div class="cts-dialog-wrap" v-on:click="popupOutside($event)">
        <div ref="cts-dialog" v-bind:class="{ 'dl-hidden': true, 'cts-dialog': showDialog }" >
          <h3>Sửa Câu Hỏi</h3>
          <div >
            <edit-question :question="currentQuestion"></edit-question>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildQuestion from "./ChildQuestion.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import EditQuestion from './EditQuestion.vue';
import { data } from "./mockData";
import { QuestionType } from "./surveyTypes";
export default {
  components: { ChildQuestion, CustomCheckbox, EditQuestion },
  name: "Survey",
  //   props: {
  //     data: {
  //       type: Array,
  //       required: false,
  //     },
  //   },
  data: function() {
    const convertedQuestion = this.convertQuestion(data);
    return {
      types: QuestionType,
      questions: convertedQuestion,
      showDialog: false,
      currentQuestion: null,
    };
  },
  // created: function() {
  //   document.addEventListener('click', )
  // },
  methods: {
    showChildQuestion: function(question, option) {
      if (question.qsType == QuestionType.MultipleChoice) {
        return option.chidQuestions && question.answer.includes(option.value);
      }
      return option.chidQuestions && question.answer === option.value;
    },
    convertQuestion: function(questions) {
      const convertedQuestion = questions.map((item) => {
        return {
          ...item,
          answer:
            item.qsType === QuestionType.Text ||
            item.qsType === QuestionType.SignleChoice
              ? ""
              : [],
          chidQuestions: item.chidQuestions
            ? this.convertQuestion(item.chidQuestions)
            : null,
        };
      });
      return convertedQuestion;
    },
    popupOutside: function(event) {
      if (!event.target.closest('.cts-dialog')) {
        this.closeDialog();
      }
    },
    openDialog: function(question) {
      this.showDialog = true;
      if(question) {
        this.currentQuestion = question;

      }
    },
    closeDialog: function() {
      this.showDialog = false;
    },
  },
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css");
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
  border-bottom: 1px solid #0091ea;
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
  padding: 8px;
  border: 1px solid #212121;
  border-radius: 5px;
}

.btn-submit {
  padding: 10px;
  border: 1px solid #0091ea;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.btn-submit:hover {
  background-color: #0091ea;
}

.fa-edit {
  float: right;
  cursor: pointer;
  font-size: 25px;
}

.cts-dialog-container {
  display: flex;
}

.cts-dialog-backdrop {
  position: fixed;
  z-index: 201;
  opacity: 0.46;
  background-color: rgb(33, 33, 33);
  border-color: rgb(33, 33, 33);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

.cts-dialog-wrap {
  position: fixed;
  z-index: 202;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
}

.cts-dialog-virtual {
  
}

.cts-dialog {
  background: #fff;
  display: block!important;
  width: 600px;
  min-height: 300px;
  max-height: 90%;
  padding: 20px;
  overflow-y: auto;
  -webkit-animation: slide-down .3s ease-out;
  -moz-animation: slide-down .3s ease-out;
  box-shadow: 0 11px 15px -7px rgba(0,0,0,.2), 0 24px 38px 3px rgba(0,0,0,.14), 0 9px 46px 8px rgba(0,0,0,.12);
  border-radius: 4px;
}

.cts-dialog h3 {
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #0091ea;
}

@-webkit-keyframes slide-down {
      0% { opacity: 0; -webkit-transform: translateY(-50%); }   
    100% { opacity: 1; -webkit-transform: translateY(0); }
}
@-moz-keyframes slide-down {
      0% { opacity: 0; -moz-transform: translateY(-50%); }   
    100% { opacity: 1; -moz-transform: translateY(0); }
}

.dl-hidden {
  display: none;
}

.question-required {
  color: #cc2936;
}

.question-option {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
