<script setup lang="ts">
import AppCheckbox from '@/shared/ui/AppCheckbox/AppCheckbox.vue'
interface AnswerVariantsProps {
  modelValue?: boolean
  onChange: (value: boolean) => void
}
defineProps<AnswerVariantsProps>()
</script>

<template>
  <AppCheckbox
    class="auto-fill"
    label="Автоответ"
    :model-value="modelValue"
    @update:model-value="onChange"
  />
</template>

<style scoped lang="scss">
.auto-fill {
  padding: 15px 25px;
  background: var(--gray-primary);
  border-radius: 25px;
  cursor: pointer;
}
</style>
