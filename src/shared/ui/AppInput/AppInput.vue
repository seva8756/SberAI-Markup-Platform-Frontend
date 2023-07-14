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
  },
  bigplaceholder: {
    type: Boolean,
    default: false
  },
  squared: {
    type: Boolean,
    default: false
  },
})

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label :class="['input', { 'bigplaceholder': bigplaceholder }, { 'squared': squared }]">
    <span>{{ label }}</span>
    <div v-if="type === 'file'" class="file-input">
      <input type="file" multiple @change="updateInput" :placeholder="placeholder" />
      <button class="file-button">Choose Files</button>
    </div>
    <input v-else :type="type" :value="value" @input="updateInput" :placeholder="placeholder" />
  </label>
</template>

<style scoped lang="scss">
.file-button {
  outline: none;
  color: var(--text-color);
  padding: 8px 15px;
  background: var(--gray-primary);
  border-radius: 22.5px;
  height: 40px;
  cursor: pointer;
  border-style: dashed;
  border-width: 2px;
  border-color: #505050;
}

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
.bigplaceholder {
  input {
    text-align: left;
    font-family: var(--font-family-main);
    font-size: var(--font-size-xl);
    font-weight: 700;
    padding: 40px 20px;
    &::placeholder {
      color: var(--text-color);
      text-align: center;
    }
    &:focus::placeholder {
      color: transparent;
    }
  }
}

.squared {
  input {
    border-radius: 15px;
    border: 3px solid #505050;
    background-color: transparent;
  }
}

.stretch input {
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
