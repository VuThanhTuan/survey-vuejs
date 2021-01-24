<template>
  <label class="cbx-container">
    <input
      :type="checkboxType"
      :id="id"
      v-model="customData"
      :value="optionValue"
      @change="checkBoxChange()"
    />
    <span class="cbx-text">{{ label }}</span>
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    id: {
      type: String,
      required: false,
    },
    // multiple or single
    type: {
      type: String,
      required: false,
      default: 'multiple',
    },
    checked: {
      type: Boolean,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    optionValue: {
      type: [Number, String, Boolean],
      required: false,
    },
    value: {
      type: [Array, String],
      required: true,
    },
  },
  watch: {
    value: function(val) {
      this.customData = val;
    },
  },
  computed: {
    checkboxType: function() {
      return this.type === 'multiple' ? 'checkbox' : 'radio';
    }
  },
  data: function() {
    const customData = this.checked
      ? this.value.push(this.optionValue)
      : this.value;
    return {
      customData,
    };
  },
  methods: {
    checkBoxChange: function() {
      this.$emit("change", this.customData);
    },
  },
};
</script>

<style scoped>
.cbx-container {
  position: relative;
  cursor: pointer;
  font-size: 22px;
  height: 25px;
  margin-right: 20px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.cbx-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #0091ea;
  border-radius: 3px;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

input:checked ~ .checkmark:after {
  display: block;
}

.cbx-text:hover {
  font-weight: bold;
}

input:checked ~ .cbx-text {
  font-weight: bold;
}

.checkmark:after {
  left: 7px;
  top: 0px;
  width: 8px;
  height: 18px;
  border: solid #212121;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.cbx-text {
  width: calc(100% - 45px);
  overflow: hidden;
  text-align: left;
  padding-left: 35px;
  white-space: nowrap;
  font-size: 15px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 25px;
  letter-spacing: normal;
}
</style>
