<script setup lang="ts">
import ProjectTaskForm from '@/features/AnswerTaskForm'
import ImageShowcase from '@/features/ImagesShowcase'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import type { TaskUIProps } from '../../model/types/TaskUIProps'

const currentTaskStore = useCurrentTaskStore()

defineProps<TaskUIProps>()
</script>

<template>
  <HStack max justify="between">
    <ImageShowcase
      :images="currentTaskStore.currentTask?.images ?? []"
      :is-loading="currentTaskStore.isLoading"
    />
    <ProjectTaskForm
      :current-task="currentTaskStore.currentTask"
      :project="project"
      :question="
        currentTaskStore.currentTask?.question
          ? currentTaskStore.currentTask?.question
          : project.question_title
      "
      :is-loading="currentTaskStore.isLoading"
      :is-last-task="currentTaskStore.isLastTask"
      @on-prev="currentTaskStore.goToPreviousTask(project.ID)"
      @on-next="currentTaskStore.goToNextTask(project.ID)"
      @on-save="currentTaskStore.saveCurrentTask"
      :no-tasks-available="currentTaskStore.noTasksAvailable"
    />
  </HStack>
</template>

<style scoped lang="scss"></style>
