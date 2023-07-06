<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])
defineProps({
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String
  },
  value: {
    type: [String, Number]
  }
})

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label class="input">
    <span>{{ label }}</span>
    <input :type="type" :value="value" @input="updateInput" :placeholder="placeholder" />
  </label>
</template>

<style scoped lang="scss">
.input {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;

  input {
    outline: none;
    border: none;
    color: var(--text-color);
    padding: 8px 15px;
    background: var(--gray-primary);
    border-radius: 22.5px;
    height: 40px;

    &::placeholder {
      color: var(--hint-color);
    }
  }
}
</style>
