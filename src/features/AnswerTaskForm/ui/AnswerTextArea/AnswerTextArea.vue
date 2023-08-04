<script setup lang="ts">
import AppTextArea from '@/shared/ui/AppTextArea/AppTextArea.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'

interface AnswerTextAreaProps {
  modelValue?: string
  onChange: (value: string) => void
  isLoading?: boolean
  placeholder?: string
}
defineProps<AnswerTextAreaProps>()
</script>

<template>
  <AppTextArea
    v-if="!isLoading"
    background-type="filled"
    @update:model-value="onChange"
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
