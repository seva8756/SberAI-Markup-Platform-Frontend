<script lang="ts" setup>
const emits = defineEmits(['update:checkedValue'])
import '@/app/styles/variables/global.scss'
const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: ''
  },
  value: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  checked: {
    type: Boolean,
    default: false
  },
  group: {
    type: Boolean,
    default: false
  }
})

const handleClick = (event) => {
  emits('update:checkedValue', event.target.value)
}
</script>

<template>
  <div class="button-area" style="display: flex; align-items: center;">
    <input
        class="radiobutton"
        type="radio"
        :name="name"
        :id="id"
        :value="value"
        :checked="checked"
        @input="handleClick($event)">
    <label class="options" :for="id" style="margin-left: 20px;">{{label}}</label>
  </div>

</template>

<style lang="scss" scoped>
.options {
  color: var(--text-primary-color);
  font-size: 20px;
  font-family: var(--font-family);
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.radiobutton  {
  width: 25px;
  height: 25px;
  display: inline-block;
  position: relative;
  color: var(--background-color-secondary);
  border: 0;
  border-radius: 50%;
  cursor: pointer;

  &:checked {
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 14px;
      height: 14px;
      background-color: var(--accent-color);
      border-radius: 50%;
    }
  }
}

.button-area {
  margin: 10px;
}
</style>