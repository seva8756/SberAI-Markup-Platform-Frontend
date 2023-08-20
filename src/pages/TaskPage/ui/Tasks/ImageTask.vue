<script setup lang="ts">
import ProjectTaskForm from '@/features/AnswerTaskForm'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import type { TaskUIProps } from '../../model/types/TaskUIProps'
import { AnswerUploadImage } from '@/features/AnswerTaskForm'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import FlexWrapper from '@/shared/ui/Stack/FlexWrapper/FlexWrapper.vue'
import { isMobile } from 'mobile-device-detect'

const currentTaskStore = useCurrentTaskStore()
defineProps<TaskUIProps>()
</script>

<template>
  <FlexWrapper
    :direction="isMobile ? 'column' : 'row'"
    max
    :gap="isMobile ? '30' : undefined"
    align="start"
    justify="between"
  >
    <VStack align="start" gap="30">
      <div :class="{ container: isMobile }">
        <AppText weight="500" :size="isMobile ? 'l' : 'xl'"
          >1.
          {{
            currentTaskStore.currentTask?.question
              ? currentTaskStore.currentTask?.question
              : project.question_title
          }}</AppText
        >
      </div>
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
  </FlexWrapper>
</template>

<style scoped lang="scss"></style>
