<template>
  <div class="container">
    <VStack gap="70" align="start">
      <HStack style="position: relative" max justify="between">
        <VStack align="start">
          <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
          <TaskIndex
            :is-loading="currentTaskStore.isLoading"
            :index="currentTaskStore.currentTask?.index.toString()"
          />
        </VStack>
        <TasksPagination
          :no-tasks-available="currentTaskStore.noTasksAvailable"
          :is-loading="currentTaskStore.isLoading"
          :tasks-ids="currentTaskStore.reversedPaginationIds"
          :current-index="currentTaskStore.currentPaginationIndex"
          @on-change-current-task="onChangeCurrentTask"
        />
      </HStack>
      <TextTask
        v-if="currentTaskStore.currentProject?.answer_type === AnswerType.TEXT"
        :project="currentProject"
      />
      <ChoiceTask
        :project="currentProject"
        v-else-if="currentTaskStore.currentProject?.answer_type === AnswerType.CHOICE"
      />
      <ImageTask :project="currentProject" v-else />
    </VStack>
    <NoAvailableTasksModal :on-close="closeModal" :is-open="isVisible" />
  </div>
</template>

<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import TaskIndex from '../TaskIndex/TaskIndex.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { useModal } from '@/shared/lib/hooks/useModal'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { type Project } from '@/entities/Project'
import TasksPagination from '@/features/TasksPagination'
import TextTask from '../Tasks/TextTask.vue'
import { AnswerType } from '@/entities/Task'
import ChoiceTask from '../Tasks/ChoiceTask.vue'
import ImageTask from '../Tasks/ImageTask.vue'
import NoAvailableTasksModal from '../NoAvailableTasksModal/NoAvailableTasksModal.vue'
import { useAnswerTaskStore } from '@/features/AnswerTaskForm'
import { NotificationType, useNotificationStore } from '@/entities/Notification'

interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()
const currentTaskStore = useCurrentTaskStore()
const answerTaskStore = useAnswerTaskStore()
const notificationStore = useNotificationStore()
// const { currentTask, solvedTasksIds, answer, cachedTasks, isLoading, isAutoFill } =
//   storeToRefs(currentTaskStore)
// const { fillTextAnswer, fetchCurrentTask, goToNextTask, setAnswer } = currentTaskStore
const [isVisible, { openModal, closeModal, extra }] = useModal()

const onChangeCurrentTask = ({ id, index }: { id: number; index: number }) => {
  if (index !== currentTaskStore.currentPaginationIndex) {
    currentTaskStore.setPaginationIndex(index)
    currentTaskStore.setCurrentTask({
      projectId: props.currentProject.ID,
      taskIndex: id
    })
  }
}

const onArrowDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') {
    event.preventDefault()
    if (answerTaskStore.answer) {
      currentTaskStore.goToNextTask(props.currentProject.ID)
    } else {
      notificationStore.addNotification({
        message: 'Заполните ответ',
        notificationType: NotificationType.ERROR
      })
    }
  } else if (event.key === 'ArrowLeft') {
    currentTaskStore.goToPreviousTask(props.currentProject.ID)
  }
}

watchEffect(() => {
  if (currentTaskStore.error) {
    openModal()
  }
})

onMounted(() => {
  if (props.currentProject) {
    currentTaskStore.initPaginationIds(props.currentProject.ID)
    currentTaskStore.fetchCurrentTask(props.currentProject.ID)
  }
  document.body.addEventListener('keydown', onArrowDown)
})

onUnmounted(() => {
  // currentTaskStore.clearCurrentTask()
  currentTaskStore.$reset()
  // currentTaskStore.resetAnswer()
  document.body.removeEventListener('keydown', onArrowDown)
})
</script>

<style scoped></style>
