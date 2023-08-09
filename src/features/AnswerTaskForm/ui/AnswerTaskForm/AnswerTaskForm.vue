<template>
  <VStack max align="start" gap="30">
    <AppText size="xl" weight="500">{{ question }}</AppText>
    <AnswerVariants
      v-if="project.answer_type === AnswerType.CHOICE"
      :is-loading="isLoading"
      :on-change="onChangeChoice"
      :model-value="modelValue"
      :variants="project.answer_choice"
    />
    <template v-else>
      <AnswerTextArea
        :on-change="onChangeChoice"
        :model-value="modelValue"
        placeholder="Введите ответ"
      />
    </template>
  </VStack>
</template>

<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { AnswerType, type Task } from '@/entities/Task'
import type { Project } from '@/entities/Project'
import AnswerVariants from '../AnswerVariants/AnswerVariants.vue'
import AnswerTextArea from '../AnswerTextArea/AnswerTextArea.vue'

interface AnswerTaskFormProps {
  question: string
  onChangeChoice: (value: string) => void
  modelValue?: string
  currentTask: Task | null
  project: Project
  isLoading: boolean
}

defineProps<AnswerTaskFormProps>()
</script>

<style scoped></style>
