<template>
  <div>
    <h3>{{ group ? "Sửa Nhóm" : "Thêm Nhóm" }}</h3>
    <div v-if="groupNameError" class="sv-error-box">
      Xin hãy nhập đầy đủ các thông tin
    </div>

    <div class="question-group">
      <label> Nhập tên nhóm: </label>
      <div class="question-answer">
        <input
          class="popup-input options-input"
          v-bind:class="{ 'sv-text-danger': groupNameError }"
          v-model="groupName"
        />
      </div>
    </div>

    <div class="popup-action">
      <button v-on:click="addOrEditGroup()" class="btn-popup">Chấp nhận</button>
      <button v-if="group" v-on:click="deleteGroup()" class="btn-popup">
        <i class="fas fa-times"></i>Xóa nhóm
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    group: {
      type: Object,
      required: false,
    },
  },
  data: function () {
    return {
      groupName: this.group.group,
      groupNameError: false,
    };
  },
  methods: {
    addOrEditGroup: function () {
      if(this.hasFormError()) {
        return;
      }
      this.group ? this.$emit("edit-group", {
        id: this.group.id,
        groupName: this.groupName,
      })
      : this.$emit("add-group", this.groupName);
    },
    deleteGroup: function() {
      if(confirm('Bạn có chắc chắn muốn xóa nhóm này')) {
        this.$emit('delete-group', this.group.id);
      }
    },
    hasFormError: function() {
      this.groupNameError = false;
      if(!this.groupName) {
        this.groupNameError = true;
      }
      return this.groupNameError;
    }
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

.btn-popup i {
  color: #cc2936;
  margin-right: 10px;
}
</style>