<script setup lang="ts">
import ProjectTaskForm from '@/features/AnswerTaskForm'
import ImageShowcase, { ImageSwiper } from '@/features/ImagesShowcase'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import type { TaskUIProps } from '../../model/types/TaskUIProps'
import FlexWrapper from '@/shared/ui/Stack/FlexWrapper/FlexWrapper.vue'
import { isMobile } from 'mobile-device-detect'

const currentTaskStore = useCurrentTaskStore()
defineProps<TaskUIProps>()
</script>

<template>
  <FlexWrapper
    :direction="isMobile ? 'column' : 'row'"
    :gap="isMobile ? '20' : undefined"
    max
    justify="between"
  >
    <ImageSwiper
      v-if="isMobile"
      :images="currentTaskStore.currentTask?.images ?? []"
      :is-loading="currentTaskStore.isLoading"
    />
    <ImageShowcase
      v-else
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
      :no-tasks-available="currentTaskStore.noTasksAvailable"
      @on-prev="currentTaskStore.goToPreviousTask(project.ID)"
      @on-next="currentTaskStore.goToNextTask(project.ID)"
      @on-save="currentTaskStore.saveCurrentTask"
    />
  </FlexWrapper>
</template>

<style scoped lang="scss"></style>
