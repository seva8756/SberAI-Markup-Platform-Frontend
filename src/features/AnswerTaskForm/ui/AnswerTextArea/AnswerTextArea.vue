<script setup lang="ts">
import AppTextArea from '@/shared/ui/AppTextArea/AppTextArea.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'

interface AnswerTextAreaProps {
  modelValue?: string
  isLoading?: boolean
  placeholder?: string
}
defineProps<AnswerTextAreaProps>()
const emit = defineEmits(['update:modelValue'])

const updateInput = (value: string) => {
  emit('update:modelValue', value)
}
</script>

<template>
  <AppTextArea
    v-if="!isLoading"
    background-type="filled"
    @update:model-value="updateInput"
    :model-value="modelValue"
    :placeholder="placeholder"
  />
  <AppSkeleton v-else class="skeleton" />
</template>

<style scoped lang="scss">
.skeleton {
  width: 720px;
  height: 350px;
  border-radius: 20px;
}
</style>
