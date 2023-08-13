<template>
  <div class="container">
    <VStack v-if="currentTaskStore.error" gap="24">
      <AppText weight="600" variant="accent" size="xl">Спасибо!</AppText>
      <hr class="line" />
      <AppText size="l">{{ taskErrorsMapper[currentTaskStore.error] }}</AppText>
      <AppButton button-tag="link" :to="routes.projects()">На главную</AppButton>
    </VStack>
    <VStack v-else gap="70" align="start">
      <HStack style="position: relative" max justify="between">
        <VStack align="start">
          <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
          <TaskIndex
            :is-loading="currentTaskStore.isLoading"
            :index="currentTaskStore.currentTask?.index.toString()"
          />
        </VStack>
        <TasksPagination
          :is-loading="currentTaskStore.isLoading"
          :tasks-ids="currentTaskStore.paginationIds"
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
    <ApproveAnswerModal
      :on-close="closeModal"
      :is-open="extra === 'ApproveAnswerModal'"
      :on-approve="onApproveAnswer"
    />
  </div>
</template>

<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import ApproveAnswerModal from '../ApproveAnswerModal/ApproveAnswerModal.vue'
import TaskIndex from '../TaskIndex/TaskIndex.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { useModal } from '@/shared/lib/hooks/useModal'
import { onMounted, onUnmounted } from 'vue'
import { type Project } from '@/entities/Project'
import { routes } from '@/shared/const/routes'
import { taskErrorsMapper } from '../../const/serverErrors'
import TasksPagination from '@/features/TasksPagination'
import TextTask from '../Tasks/TextTask.vue'
import { AnswerType } from '@/entities/Task'
import ChoiceTask from '../Tasks/ChoiceTask.vue'
import ImageTask from '../Tasks/ImageTask.vue'

interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()
const currentTaskStore = useCurrentTaskStore()
// const { currentTask, solvedTasksIds, answer, cachedTasks, isLoading, isAutoFill } =
//   storeToRefs(currentTaskStore)
// const { fillTextAnswer, fetchCurrentTask, goToNextTask, setAnswer } = currentTaskStore
const [isVisible, { openModal, closeModal, extra }] = useModal()

const onApproveAnswer = () => {
  currentTaskStore.goToNextTask(props.currentProject.ID)
  closeModal()
}

const onChangeCurrentTask = ({ id, index }: { id: number; index: number }) => {
  currentTaskStore.setPaginationIndex(index)
  currentTaskStore.setCurrentTask({
    projectId: props.currentProject.ID.toString(),
    taskIndex: id
  })
}

const onArrowDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' && !isVisible.value) {
    event.preventDefault()
    openModal('ApproveAnswerModal')
  } else if (isVisible.value && event.key === 'Enter') {
    closeModal()
    currentTaskStore.goToNextTask(props.currentProject.ID)
  }
}

onMounted(() => {
  if (props.currentProject) {
    currentTaskStore.initPaginationIds(props.currentProject.ID)
    currentTaskStore.fetchCurrentTask(props.currentProject.ID)
  }
  document.body.addEventListener('keydown', onArrowDown)
})

onUnmounted(() => {
  currentTaskStore.clearCurrentTask()
  // currentTaskStore.resetAnswer()
  document.body.removeEventListener('keydown', onArrowDown)
})
</script>

<style scoped>
.form {
  width: 720px;
}

.line {
  width: 620px;
  height: 3px;
  background: var(--hint-color-muted);
  border: none;
  border-radius: 3px;
}
</style>
