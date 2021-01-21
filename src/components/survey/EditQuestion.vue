<template>
  <div>
    <div class="question-group">
      <label> Câu hỏi: </label>
      <div class="question-answer">
        <input class="popup-input options-input" v-model="question.label" />
      </div>
    </div>

    <div class="question-group">
      <label> Loại câu hỏi: </label>
      <div class="question-checkbox-group">
        <custom-checkbox
          type="single"
          v-model="questionType"
          optionValue="required"
          label="Bắt buộc"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionType"
          optionValue="not required"
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
          optionValue="Text"
          label="Text"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionStyle"
          optionValue="Single Choice"
          label="Single Choice"
        ></custom-checkbox>
        <custom-checkbox
          type="single"
          v-model="questionStyle"
          optionValue="Multiple Choice"
          label="Multiple Choice"
        ></custom-checkbox>
      </div>
    </div>

    <div
      v-if="
        questionStyle === 'Single Choice' || questionStyle === 'Multiple Choice'
      "
      class="question-group"
    >
      <div class="question-options">
        <label> Đáp án: </label>
        <i class="fas fa-plus" v-on:click="addOption()"></i>
      </div>
      <div v-for="(item, index) in options" :key="index">
        <input class="popup-input options-input" v-model="options[index]" />
        <i v-if="index !== 0" v-on:click="removeOption(index)" class="fas fa-trash-alt"></i>
      </div>
    </div>

    <div class="popup-action">
      <button class="btn-popup">Chấp nhận</button>
      <button class="btn-popup"><i class="fas fa-times"></i>Xóa câu hỏi</button>
    </div>
  </div>
</template>

<script>
import CustomCheckbox from "./CustomCheckbox.vue";
export default {
  components: { CustomCheckbox },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  data: function () {
    return {
      questionType: "required",
      questionStyle: "Text",
      options: [""],
    };
  },
  methods: {
    addOption: function () {
      this.options.push("");
    },
    removeOption: function (index) {
      if (this.options.length > 1) {
        setTimeout(() => {
          this.options.splice(index, 1);
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
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

label{
  font-weight: bold;
}

.popup-action {
  padding-top: 20px;
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
</style>
