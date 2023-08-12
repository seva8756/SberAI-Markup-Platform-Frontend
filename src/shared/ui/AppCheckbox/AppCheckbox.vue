<script setup lang="ts">
import { computed } from 'vue'
import { getHStack } from '../../lib/helpers/getHStack'

const emits = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  label: {
    type: String,
    default: ''
  }
})
const handleClick = (event: Event) => {
  emits('update:modelValue', (event.target as HTMLInputElement).checked)
}
</script>

<template>
  <label :class="[getHStack({ gap: '10' })]">
    <input
      type="checkbox"
      :value="modelValue"
      :checked="modelValue"
      @change="handleClick"
      class="real-radio-btn"
    />
    <span class="custom-radio-btn"></span>
    <span class="input_text">{{ label }}</span>
  </label>
</template>

<style scoped lang="scss">
.custom-radio-btn {
  position: relative;
  display: inline-block;
  width: 26px;
  height: 26px;
  border: 3px solid var(--text-color);
  border-radius: 10px;
  vertical-align: text-top;
}

.custom-radio-btn::before {
  content: '';
  display: inline-block;
  width: 15px;
  height: 15px;
  background-color: var(--text-color);
  border-radius: 5px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 0.2s ease-in;
}

.real-radio-btn {
  width: 0;
  height: 0;
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.real-radio-btn:checked + .custom-radio-btn::before {
  transform: translate(-50%, -50%) scale(1);
}

.input_text {
  color: var(--text-color);
  font-size: 18px;
  font-weight: 500;
}
</style>
