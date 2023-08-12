<template>
  <div class="container">
    <template v-if="currentTaskStore.error">
      <VStack gap="24">
        <AppText weight="600" variant="accent" size="xl">Спасибо!</AppText>
        <hr class="line" />
        <AppText size="l">{{ taskErrorsMapper[currentTaskStore.error] }}</AppText>
        <AppButton button-tag="link" :to="routes.projects()">На главную</AppButton>
      </VStack>
    </template>
    <template v-else>
      <HStack justify="between" align="start">
        <VStack gap="50" align="start">
          <VStack align="start">
            <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
            <TaskIndex
              :is-loading="currentTaskStore.isLoading"
              :index="currentTaskStore.currentTask?.index.toString()"
            />
          </VStack>
          <ImageShowcase
            v-if="currentTaskStore.currentTask?.images"
            :images="currentTaskStore.currentTask.images"
            :is-loading="currentTaskStore.isLoading"
          />
        </VStack>
        <VStack align="end" gap="70" class="form">
          <TasksPagination
            :is-loading="currentTaskStore.isLoading"
            :tasks-ids="currentTaskStore.paginationIds"
            :current-index="currentTaskStore.currentPaginationIndex"
            @on-change-current-task="onChangeCurrentTask"
          />
          <VStack gap="30">
            <ProjectTaskForm
              :current-task="currentTaskStore.currentTask"
              :on-change-choice="onChange"
              :project="currentProject"
              :model-value="currentTaskStore.answer"
              :question="currentProject.question_title"
              :is-loading="currentTaskStore.isLoading"
            />
            <HStack justify="between" max>
              <AutoFillButton
                v-if="currentTaskStore.currentTask?.placeholder"
                :on-change="onChangeAutoFill"
                :model-value="currentTaskStore.isAutoFill"
              />
              <HStack gap="30" justify="end">
                <AppButton
                  @click="currentTaskStore.goToPreviousTask(currentProject.ID)"
                  color="gray"
                  class="continue"
                  size="custom"
                >
                  Назад
                </AppButton>
                <AppButton
                  @click="currentTaskStore.goToNextTask(currentProject.ID)"
                  class="continue"
                  size="custom"
                  :is-loading="currentTaskStore.isLoading"
                  >Далее</AppButton
                >
                <AppButton
                  v-if="!currentTaskStore.isLastTask"
                  class="continue"
                  size="custom"
                  :disabled="currentTaskStore.answer === currentTaskStore.currentTask?.answer"
                  @click="currentTaskStore.sendUserAnswer(currentProject.ID)"
                  >Сохранить</AppButton
                >
              </HStack>
            </HStack>
          </VStack>
        </VStack>
      </HStack>
      <ApproveAnswerModal
        :on-close="closeModal"
        :is-open="extra === 'ApproveAnswerModal'"
        :on-approve="onApproveAnswer"
      />
      <ApproveAutoFillModal
        :on-close="closeModal"
        :is-open="extra === 'ApproveAutoFillModal'"
        :on-approve="currentTaskStore.fillTextAnswer"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import ProjectTaskForm from '@/features/AnswerTaskForm'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import ApproveAnswerModal from '../ApproveAnswerModal/ApproveAnswerModal.vue'
import TaskIndex from '../TaskIndex/TaskIndex.vue'
import ApproveAutoFillModal from '../ApproveAutoFillModal/ApproveAutoFillModal.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { useModal } from '@/shared/lib/hooks/useModal'
import { onMounted, onUnmounted, watchEffect } from 'vue'
import { type Project } from '@/entities/Project'
import { routes } from '@/shared/const/routes'
import { taskErrorsMapper } from '../../const/serverErrors'
import ImageShowcase from '@/features/ImagesShowcase'
import AutoFillButton from '../AutoFillButton/AutoFillButton.vue'
import TasksPagination from '@/features/TasksPagination'
import { storeToRefs } from 'pinia'
interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()
const currentTaskStore = useCurrentTaskStore()
// const { currentTask, solvedTasksIds, answer, cachedTasks, isLoading, isAutoFill } =
//   storeToRefs(currentTaskStore)
// const { fillTextAnswer, fetchCurrentTask, goToNextTask, setAnswer } = currentTaskStore
const [isVisible, { openModal, closeModal, extra }] = useModal()

const onChange = (value: string) => {
  console.log(value)
  currentTaskStore.setAnswer(value)
}

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

const onChangeAutoFill = (isChecked: boolean) => {
  if (currentTaskStore.answer && !currentTaskStore.isAutoFill) {
    openModal('ApproveAutoFillModal')
  } else {
    currentTaskStore.fillTextAnswer()
  }
  currentTaskStore.isAutoFill = isChecked
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

.continue {
  width: 120px;
  padding: 15px 30px;
}

.line {
  width: 620px;
  height: 3px;
  background: var(--hint-color-muted);
  border: none;
  border-radius: 3px;
}
</style>
