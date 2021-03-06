<template>
  <div>
    <h3>{{ question ? "Sửa Câu Hỏi" : "Thêm câu hỏi" }}</h3>
    <div v-if="hasError" class="sv-error-box">
      Xin hãy nhập đầy đủ các thông tin
    </div>

    <div v-if="!question && !parentQuestion" class="question-group">
      <label> Nhóm: </label>
      <div class="question-answer">
        <select class="popup-input options-input" v-model="questionGroup">
          <option v-for="(group, index) in groups" :key="group" :value="index">
            {{ group }}
          </option>
        </select>
      </div>
    </div>

    <div class="question-group">
      <label> Câu hỏi: </label>
      <div class="question-answer">
        <input
          class="popup-input options-input"
          v-bind:class="{ 'sv-text-danger': questionNameError }"
          v-model="questionName"
        />
      </div>
    </div>

    <div class="question-group">
      <label> Loại câu hỏi: </label>
      <div class="question-checkbox-group">
        <custom-checkbox
          type="single"
          v-model="questionType"
          optionValue="true"
          label="Bắt buộc"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionType"
          optionValue="false"
          label="Không bắt buộc"
        ></custom-checkbox>
      </div>
    </div>

    <div class="question-group">
      <label> Kiểu câu hỏi: </label>
      <div class="question-checkbox-group">
        <custom-checkbox
          type="single"
          v-model="questionStyle"
          :optionValue="types.Text"
          label="Text"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionStyle"
          :optionValue="types.SingleChoice"
          label="Single Choice"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionStyle"
          :optionValue="types.MultipleChoice"
          label="Multiple Choice"
        ></custom-checkbox>
      </div>
    </div>

    <div
      v-if="
        questionStyle === types.SingleChoice || questionStyle === types.MultipleChoice
      "
      class="question-group"
    >
      <div class="question-options">
        <label> Đáp án: </label>
        <i class="fas fa-plus" v-on:click="addOption()"></i>
      </div>
      <div v-for="(item, index) in options" :key="index">
        <input
          class="popup-input options-input"
          v-bind:class="{ 'sv-text-danger': item.error }"
          v-model="options[index].label"
        />
        <i
          v-if="index !== 0"
          v-on:click="removeOption(index)"
          class="fas fa-trash-alt"
        ></i>
      </div>
    </div>

    <div class="popup-action">
      <button v-on:click="addOrEditQuestion()" class="btn-popup">
        Chấp nhận
      </button>
      <button v-if="question" v-on:click="deleteQuestion()" class="btn-popup">
        <i class="fas fa-times"></i>Xóa câu hỏi
      </button>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "./CustomCheckbox.vue";
import { QuestionType } from "./surveyTypes";
export default {
  components: { CustomCheckbox },
  props: {
    question: {
      type: Object,
      required: false,
    },
    groups: {
      type: Array,
      required: false,
    },
    parentQuestion: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {
      types: QuestionType,
      hasError: false,
      questionGroup: 0,
      questionName: this.question ? this.question.question : "",
      questionNameError: false,
      questionType: this.question ? `${this.question.required}` : "true",
      questionStyle: this.question ? this.question.qsType : "Text",
      options:
        this.question && this.question.options
          ? this.question.options.map((x) => {
              return {
                label: x.label,
                error: false,
              };
            })
          : [{ label: "", error: false }],
    };
  },
  methods: {
    addOption: function () {
      this.options.push({ label: "", error: false });
    },
    removeOption: function (index) {
      if (this.options.length > 1) {
        setTimeout(() => {
          this.options.splice(index, 1);
        }, 100);
      }
    },
    addOrEditQuestion: function () {
      if (this.isInvalidForm()) {
        return;
      }
      const question = {
        id: this.question ? this.question.id : null,
        qsGroup: this.question ? this.question.qsGroup : this.questionGroup,
        qsType: this.questionStyle,
        question: this.questionName,
        required: this.questionType === "true" ? true : false,
        answer: this.questionStyle === this.types.MultipleChoice ? [] : "",
        options:
          this.questionStyle !== this.types.Text
            ? this.options.map((x) => {
                return {
                  label: x.label,
                  value: x.label,
                };
              })
            : null,
      };
      if (this.parentQuestion) {
        question.parentQuestion = this.parentQuestion;
      }
      this.parentQuestion
        ? this.addOrEditChildQuestion(question)
        : this.addOrEditRootQuestion(question);
    },
    addOrEditRootQuestion: function (question) {
      this.question
        ? this.$emit("save-question", question)
        : this.$emit("add-question", question);
    },
    addOrEditChildQuestion: function (question) {
      this.question
        ? this.$emit("save-child-question", question)
        : this.$emit("add-child-question", question);
    },
    deleteQuestion: function () {
      if (confirm("Bạn có chắc chắn xóa câu hỏi này không?")) {
        this.parentQuestion
          ? this.$emit("delete-child-question", {
              id: this.question.id,
              parentQuestion: this.parentQuestion,
            })
          : this.$emit("delete-question", {
              id: this.question.id,
              qsGroup: this.question.qsGroup,
            });
      }
    },
    isInvalidForm: function () {
      this.resetError();

      if (!this.questionName) {
        this.questionNameError = true;
        this.hasError = true;
      }

      if (
        this.questionStyle === this.types.SingleChoice ||
        this.questionStyle === this.types.MultipleChoice
      ) {
        this.options.forEach((element) => {
          element.error = !element.label;
        });
        if(this.options.filter((x) => x.error).length > 0) {
          this.hasError = true
        }
      }
      
      return this.hasError;
    },
    resetError: function () {
      this.hasError = false;
      this.questionNameError = false;
      this.options.forEach((element) => {
        element.error = false;
      });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 0;
  padding-top: 15px;
  padding-bottom: 15px;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #0091ea;
}

.question-group {
  padding: 10px;
}

.question-answer {
  margin-top: 10px;
}

.popup-input {
  padding: 6px;
  border: 1px solid #212121;
  border-radius: 5px;
}

.options-input {
  margin-bottom: 15px;
  width: 70%;
}

.question-checkbox-group {
  padding-bottom: 10px;
  padding-top: 10px;
}

.question-options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

i {
  font-size: 15px;
  color: #0091ea;
  cursor: pointer;
}

.fa-trash-alt {
  margin-left: 20px;
}

label {
  font-weight: bold;
}

.popup-action {
  padding: 10px;
}

.btn-popup {
  padding: 8px;
  border: 1px solid #0091ea;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 20px;
}

.btn-popup i {
  color: #cc2936;
  margin-right: 10px;
}

.btn-popup:hover {
  background-color: #0091ea;
}

.sv-text-danger {
  border: 1px solid #cc2936;
}

.sv-error-box {
  background-color: #cc2936;
  color: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-top: 5px;
}
</style>
