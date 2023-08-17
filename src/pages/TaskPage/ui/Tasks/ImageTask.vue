<script setup lang="ts">
import ProjectTaskForm from '@/features/AnswerTaskForm'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import type { TaskUIProps } from '../../model/types/TaskUIProps'
import { AnswerUploadImage } from '@/features/AnswerTaskForm'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'

const currentTaskStore = useCurrentTaskStore()
defineProps<TaskUIProps>()
</script>

<template>
  <HStack max align="start" justify="between">
    <VStack align="start" gap="30">
      <AppText weight="500" size="xl"
        >1.
        {{
          currentTaskStore.currentTask?.question
            ? currentTaskStore.currentTask?.question
            : project.question_title
        }}</AppText
      >
      <AnswerUploadImage />
    </VStack>
    <ProjectTaskForm
      :current-task="currentTaskStore.currentTask"
      :project="project"
      :question="'2. Опишите загруженное изображение'"
      :is-loading="currentTaskStore.isLoading"
      :is-last-task="currentTaskStore.isLastTask"
      :no-tasks-available="currentTaskStore.noTasksAvailable"
      @on-prev="currentTaskStore.goToPreviousTask(project.ID)"
      @on-next="currentTaskStore.goToNextTask(project.ID)"
      @on-save="currentTaskStore.saveCurrentTask"
    />
  </HStack>
</template>

<style scoped lang="scss"></style>
