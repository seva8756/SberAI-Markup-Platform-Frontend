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
  <input
      class="radiobutton"
      type="radio"
      :name="name"
      :id="id"
      :value="value"
      :checked="checked"
      :disabled="disabled"
      @input="handleClick($event)">
  <label class="options" :for="id">{{label}}</label>
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
.radiobutton {
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  background-color: var(--background-color-secondary);
  &:checked {
    border-color: var(--primary);
    background-color: var(--primary);
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
  }

}
</style>