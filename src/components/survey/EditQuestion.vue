<template>
  <div>

    <div class="question-group">
      <label>
        Câu hỏi:
      </label>
      <input v-model="question.label" />
    </div>

    <div class="question-group">
      <label>
        Bắt buộc *:
      </label>
      <div class="question-checkbox-group">
        <custom-checkbox type="single" label="Có"></custom-checkbox>
        <custom-checkbox type="single" label="Không"></custom-checkbox>
      </div>
    </div>

    <div class="question-group">
      <label>
        Loại câu hỏi:
      </label>
      <div class="question-checkbox-group">
        <custom-checkbox type="single" label="Text"></custom-checkbox>
        <custom-checkbox type="single" label="Single Choice"></custom-checkbox>
        <custom-checkbox type="single" label="Multiple Choice"></custom-checkbox>
      </div>
    </div>


  </div>

</template>

<script>
import CustomCheckbox from './CustomCheckbox.vue';
export default {
  components: { CustomCheckbox },
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
  // data: function() {
  //   const convertQuestion = {
  //     ...this.question,

  //   }
  // }
};
</script>

<style scoped>
.question-group {
  padding: 10px;
}

.question-checkbox-group {
  padding-bottom: 10px;
  padding-top: 10px;
}
</style>
