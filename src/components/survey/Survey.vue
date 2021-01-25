<template>
  <div class="survey-container">
    <h1>Quản lý câu hỏi</h1>
    <div class="survey-header">
      <button
        v-on:click="openAddNewGroup()"
        class="btn-submit"
        style="margin-right: 10px"
      >
        Thêm nhóm
      </button>
      <button v-on:click="openQuestionDialog()" v-bind:disabled="simpleGroups.length === 0" class="btn-submit">
        Thêm câu hỏi
      </button>
    </div>

    <!-- Question -->
    <div
      class="group-container"
      v-for="(group, index) in groups"
      :key="group.group"
    >
      <div
        v-on:click="openEditGroup({ id: index, group: group.group })"
        class="group-header"
      >
        {{ group.group }}
      </div>
      <div
        class="question-container"
        v-for="(item, index) in group.questions"
        :key="item.question"
      >
        <div class="quetion-label">
          <div class="question-num">{{ index + 1 }}</div>
          {{ item.question }}
          <span v-if="item.required" class="question-required">*</span>
          <i v-on:click="openQuestionDialog(item)" class="fas fa-edit"></i>
        </div>

        <div class="question-answer">
          <div v-if="item.qsType === types.Text">
            <label class="input-text-label">Trả lời: </label
            ><input v-bind:name="item.name" v-model="item.answer" />
          </div>

          <div v-if="item.qsType === types.SingleChoice">
            <div
              class="question-option"
              v-for="option in item.options"
              :key="option.value"
            >
              <i
                class="fas fa-plus question-child-add"
                v-on:click="openChildQuestion(item, option.value, item.qsGroup)"
              ></i>
              <custom-checkbox
                type="single"
                :label="option.label"
                v-model="item.answer"
                :optionValue="option.value"
              ></custom-checkbox>
              <div class="child-question-box">
                <child-question
                  v-if="option.childQuestions"
                  :questions="option.childQuestions"
                  v-on:edit-question="
                    openEditChildQuestion(
                      $event,
                      item.qsGroup,
                      item,
                      option.value
                    )
                  "
                >
                </child-question>
              </div>
            </div>
          </div>

          <div v-if="item.qsType === types.MultipleChoice">
            <div
              class="question-option"
              v-for="option in item.options"
              :key="option.value"
            >
              <custom-checkbox
                :label="option.label"
                v-model="item.answer"
                :optionValue="option.value"
              ></custom-checkbox>
              <div class="child-question-box">
                <child-question
                  v-if="option.childQuestions"
                  :questions="option.childQuestions"
                  v-on:edit-question="
                    openEditChildQuestion(
                      $event,
                      item.qsGroup,
                      item,
                      option.value
                    )
                  "
                >
                </child-question>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Action -->
    <button v-on:click="saveQuestions()" class="btn-submit">Lưu</button>

    <!-- Dialog -->
    <div v-if="showDialog" class="cts-dialog-container">
      <div class="cts-dialog-backdrop"></div>
      <div class="cts-dialog-wrap" v-on:click="popupOutside($event)">
        <div ref="cts-dialog" class="cts-dialog">
          <add-edit-question
            v-if="showDialog"
            :question="currentQuestion"
            :groups="this.simpleGroups"
            :parentQuestion="parentQuestion"
            v-on:save-question="editQuestion($event)"
            v-on:save-child-question="editChildQuestion($event)"
            v-on:add-question="addQuestion($event)"
            v-on:add-child-question="addChildQuestion($event)"
            v-on:delete-question="deleteQuestion($event)"
            v-on:delete-child-question="deleteChildQuestion($event)"
          ></add-edit-question>
        </div>
      </div>
    </div>

    <div v-if="showDialogGroup" class="cts-dialog-container">
      <div class="cts-dialog-backdrop"></div>
      <div class="cts-dialog-wrap" v-on:click="popupOutside($event)">
        <div ref="cts-dialog" class="cts-dialog">
          <add-edit-group
            :group="currentGroup"
            v-on:add-group="addNewGroup($event)"
            v-on:edit-group="editGroup($event)"
            v-on:delete-group="deleteGroup($event)"
          ></add-edit-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChildQuestion from "./ChildQuestion.vue";
import CustomCheckbox from "./CustomCheckbox.vue";
import AddEditQuestion from "./AddEditQuestion.vue";
import { QuestionType } from "./surveyTypes";
import AddEditGroup from "./AddEditGroup.vue";

export default {
  components: { ChildQuestion, CustomCheckbox, AddEditQuestion, AddEditGroup },
  props: {
    data: {
      type: Array,
      required: false,
    },
  },
  data: function() {
    const convertedGroups = this.data.map((x, index) => {
      console.log('vao` dayyyy');
      return {
        group: x.group,
        questions: this.convertQuestion(x.questions, index),
      };
    });
    return {
      types: QuestionType,
      groups: convertedGroups,
      simpleGroups: convertedGroups.map((x) => x.group),
      showDialog: false,
      showDialogGroup: false,
      currentQuestion: null,
      parentQuestion: null,
      currentGroup: null,
    };
  },
  watch: {
    groups: function(val) {
      this.simpleGroups = val.map((x) => x.group);
    },
  },
  methods: {
    showChildQuestion: function(question, option) {
      if (question.qsType == QuestionType.MultipleChoice) {
        return option.childQuestions && question.answer.includes(option.value);
      }
      return option.childQuestions && question.answer === option.value;
    },
    convertQuestion: function(questions, group) {
      const convertedQuestion = questions.map((item, index) => {
        return {
          ...item,
          id: index,
          qsGroup: group,
          answer:
            item.qsType === QuestionType.Text ||
            item.qsType === QuestionType.SingleChoice
              ? ""
              : [],
          options: item.options
            ? item.options.map((x, opIndex) => {
                return {
                  ...x,
                  id: opIndex,
                  value: opIndex,
                  childQuestions: x.childQuestions
                    ? this.convertQuestion(x.childQuestions)
                    : null,
                };
              })
            : null,
        };
      });
      return convertedQuestion;
    },
    popupOutside: function(event) {
      if (!event.target.closest(".cts-dialog")) {
        this.closeQuestionDialog();
        this.closeGroupDialog();
      }
    },
    openQuestionDialog: function(question) {
      if (question) {
        this.currentQuestion = question;
      }
      this.showDialog = true;
    },
    closeQuestionDialog: function() {
      this.currentQuestion = null;
      this.parentQuestion = null;
      this.showDialog = false;
    },
    editQuestion: function(question) {
      if (question.qsGroup < 0 || question.qsGroup > this.groups.length - 1) {
        this.closeQuestionDialog();
        return;
      }
      const questions = this.groups[question.qsGroup].questions;
      const index = questions.findIndex((x) => x.id === question.id);

      if (index !== -1) {
        questions[index] = question;
      }
      this.closeQuestionDialog();
    },
    addQuestion: function(question) {
      if (question.qsGroup < 0 || question.qsGroup > this.groups.length - 1) {
        this.closeQuestionDialog();
        return;
      }
      const newQuestion = {
        ...question,
        id: this.groups[question.qsGroup].questions.length + 1,
      };
      this.groups[question.qsGroup].questions.push(newQuestion);
      this.closeQuestionDialog();
    },
    deleteQuestion: function(data) {
      this.groups[data.qsGroup].questions.splice(data.id, 1);
      this.closeQuestionDialog();
    },
    openChildQuestion: function(question, option, group) {
      this.parentQuestion = {
        id: question.id,
        option,
        group,
      };
      this.openQuestionDialog();
    },
    openEditChildQuestion: function(question, group, parent, option) {
      this.parentQuestion = {
        id: parent.id,
        option,
        group,
      };
      this.currentQuestion = question;
      this.openQuestionDialog();
    },
    addChildQuestion: function(question) {
      const parentQs = this.groups[question.parentQuestion.group].questions[
        question.parentQuestion.id
      ];
      if (!parentQs.options[question.parentQuestion.option].childQuestions) {
        parentQs.options[question.parentQuestion.option].childQuestions = [];
      }
      const childList =
        parentQs.options[question.parentQuestion.option].childQuestions;
      const newQuestion = {
        ...question,
        id: childList.length + 1,
      };
      childList.push(newQuestion);
      this.closeQuestionDialog();
    },
    editChildQuestion: function(question) {
      const parentQs = this.groups[question.parentQuestion.group].questions[
        question.parentQuestion.id
      ];
      if (!parentQs.options[question.parentQuestion.option].childQuestions) {
        parentQs.options[question.parentQuestion.option].childQuestions = [];
      }
      const childList = [
        ...parentQs.options[question.parentQuestion.option].childQuestions,
      ];

      childList[question.id] = question;
      parentQs.options[
        question.parentQuestion.option
      ].childQuestions = childList;
      this.closeQuestionDialog();
    },
    deleteChildQuestion: function(data) {
      const parentQs = this.groups[data.parentQuestion.group].questions[
        data.parentQuestion.id
      ];
      const childList =
        parentQs.options[data.parentQuestion.option].childQuestions;
      childList.splice(data.id, 1);
      this.closeQuestionDialog();
    },
    openAddNewGroup: function() {
      this.showDialogGroup = true;
    },
    addNewGroup: function(group) {
      this.groups.push({ group, questions: [] });
      this.closeGroupDialog();
    },
    openEditGroup: function(group) {
      this.currentGroup = group;
      this.showDialogGroup = true;
    },
    editGroup: function(group) {
      this.groups[group.id].group = group.groupName;
      this.closeGroupDialog();
    },
    deleteGroup: function(group) {
      this.groups.splice(group, 1);
      this.closeGroupDialog();
    },
    closeGroupDialog: function() {
      this.currentGroup = null;
      this.showDialogGroup = false;
    },
    saveQuestions: function() {
      const standardizedData = this.standardizedData(this.groups);
      console.log('-----', standardizedData);
      this.$emit("save-question", standardizedData);
    },
    standardizedData: function(data) {
      return data.map((x) => {
        return {
          group: x.group,
          questions: !x.questions
            ? null
            : x.questions.map((q) => ({
                question: q.question,
                qsType: q.qsType,
                required: q.required,
                options: !q.options
                  ? null
                  : q.options.map((op) => ({
                      label: op.label,
                      childQuestions: !op.childQuestions
                        ? null
                        : op.childQuestions.map((cq) => ({
                            question: cq.question,
                            qsType: cq.qsType,
                            required: cq.required,
                            options: !cq.options
                              ? null
                              : cq.options.map((cpo) => ({
                                  label: cpo.label,
                                })),
                          })),
                    })),
              })),
        };
      });
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

h1 {
  font-size: 48px;
  text-align: center;
}

.survey-header {
  text-align: right;
}

.group-container {
  margin-bottom: 30px;
}

.group-header {
  cursor: pointer;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  background-color: #bcdff5;
}

.question-container {
  margin-top: 10px;
  margin-bottom: 10px;
}

.quetion-label {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
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
  font-size: 15px;
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

.cts-dialog {
  background: #fff;
  display: block !important;
  width: 600px;
  min-height: 150px;
  max-height: 90%;
  padding: 20px;
  overflow-y: auto;
  -webkit-animation: slide-down 0.3s ease-out;
  -moz-animation: slide-down 0.3s ease-out;
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2),
    0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
}

@-webkit-keyframes slide-down {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
  }
}
@-moz-keyframes slide-down {
  0% {
    opacity: 0;
    -moz-transform: translateY(-50%);
  }
  100% {
    opacity: 1;
    -moz-transform: translateY(0);
  }
}

.dl-hidden {
  display: none;
}

.question-required {
  color: #cc2936;
}

.question-option {
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
}

.question-child-add {
  position: absolute;
  top: 5px;
  font-size: 15px !important;
  right: 14px;
  cursor: pointer;
}

.child-question-box {
  padding-left: 35px;
}
</style>
