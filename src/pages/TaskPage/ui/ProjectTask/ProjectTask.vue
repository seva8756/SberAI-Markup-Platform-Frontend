<template>
  <ProjectTaskMobile
    v-if="isMobile"
    :on-change-current-task="onChangeCurrentTask"
    :current-project="currentProject"
  />
  <div v-else class="container">
    <VStack gap="50" align="start">
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
          :tasks-ids="currentProject.completed_tasks"
          :current-index="currentTaskStore.currentPaginationIndex"
          @on-change-current-task="onChangeCurrentTask"
        />
      </HStack>
      <AppText size="xl" weight="500">{{ currentProject.question_title }}</AppText>
      <ComponentsConstructor :components="currentProject.components" />
      <HStack gap="16" class="btn_wrapper">
        <AppButton
          size="custom"
          class="continue"
          color="gray"
          @click="currentTaskStore.goToPreviousTask(currentProject.ID)"
          :is-loading="currentTaskStore.isLoading"
          >Назад</AppButton
        >
        <AppButton
          size="custom"
          class="continue"
          color="gray"
          @click="currentTaskStore.saveCurrentTask()"
          :is-loading="currentTaskStore.isLoading"
          >Сохранить</AppButton
        >
        <AppButton
          size="custom"
          class="continue"
          @click="currentTaskStore.goToNextTask(currentProject.ID)"
          :is-loading="currentTaskStore.isLoading"
          >Далее</AppButton
        >
      </HStack>
    </VStack>
  </div>
  <NoAvailableTasksModal :on-close="closeModal" :is-open="isVisible" />
</template>

<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import TaskIndex from '../TaskIndex/TaskIndex.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { useModal } from '@/shared/lib/hooks/useModal'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { type Project, useProjectsListStore } from '@/entities/Project'
import TasksPagination from '@/features/TasksPagination'
import NoAvailableTasksModal from '../NoAvailableTasksModal/NoAvailableTasksModal.vue'
import { NotificationType, useNotificationStore } from '@/entities/Notification'
import ProjectTaskMobile from '../ProjectTaskMobile/ProjectTaskMobile.vue'
import { isMobile } from 'mobile-device-detect'
import ComponentsConstructor from '../ComponentsConstructor/ComponentsConstructor.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'

interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()
const currentTaskStore = useCurrentTaskStore()
const notificationStore = useNotificationStore()
const { removeUncompletedTask } = useProjectsListStore()
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
    if (currentTaskStore.answer) {
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
  if (currentTaskStore.noTasksAvailable) {
    openModal()
  }
})

onMounted(() => {
  if (props.currentProject) {
    currentTaskStore.setCurrentProject(props.currentProject)
    currentTaskStore.fetchCurrentTask(props.currentProject.ID)
  }
  document.body.addEventListener('keydown', onArrowDown)
})

onUnmounted(() => {
  // currentTaskStore.clearCurrentTask()
  // currentTaskStore.$reset()
  // currentTaskStore.resetAnswer()
  if (currentTaskStore.currentTask) {
    removeUncompletedTask(props.currentProject.ID)
  }
  document.body.removeEventListener('keydown', onArrowDown)
})
</script>

<style scoped>
.continue {
  width: 120px;
  height: 52px;
  padding: 15px 30px;
}

.btn_wrapper {
  align-self: end;
}
</style>
