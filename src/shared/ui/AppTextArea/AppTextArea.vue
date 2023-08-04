<script setup lang="ts">
import { ref, type PropType } from 'vue'

const message = ref('')
type BackgroundType = 'transparent' | 'filled'

defineProps({
  backgroundType: {
    type: String as PropType<BackgroundType>,
    default: 'transparent'
  },
  placeholder: {
    type: String
  },
  modelValue: [String, Number]
})
const emit = defineEmits(['update:modelValue'])

const updateInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <div>
    <textarea
      :value="modelValue"
      @change="updateInput"
      :class="['textarea', backgroundType]"
      :placeholder="placeholder"
    ></textarea>
  </div>
</template>

<style scoped lang="scss">
.textarea {
  resize: none;
  outline: none;
}

.transparent {
  border-radius: 15px;
  border: 3px solid #505050;
  background-color: transparent;
  color: var(--text-color);
  resize: vertical;
}

.filled {
  border-radius: 28.5px;
  border: 1px solid var(--hint-color-muted);
  background-color: var(--gray-secondary);
  color: var(--text-color);
  width: 720px;
  height: 350px;
  padding: 20px;

  &::placeholder {
    color: var(--hint-color);
  }
}
</style>
