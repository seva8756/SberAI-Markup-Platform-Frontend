<template>
  <div class="container">
    <template v-if="currentTaskStore.error">
      <VStack gap="24">
        <AppText size="xl">{{ taskErrorsMapper[currentTaskStore.error] }}</AppText>
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
          <ImageSwiper
            v-if="currentTaskStore.currentTask?.images"
            :images="currentTaskStore.currentTask.images"
            :is-loading="currentTaskStore.isLoading"
          />
        </VStack>
        <VStack class="form">
          <ProjectTaskForm
            :current-task="currentTaskStore.currentTask"
            :on-change-choice="onChange"
            :project="currentProject"
            :model-value="currentTaskStore.answer"
            :question="currentProject.question_title"
            :is-loading="currentTaskStore.isLoading"
          />
          <HStack gap="30" justify="end" max>
            <AppButton
              v-if="currentTaskStore.currentTask?.placeholder"
              @click="openModal('ApproveAutoFillModal')"
              class="continue"
              size="custom"
              color="gray"
              :disabled="!currentTaskStore.currentTask.placeholder"
              >Автоответ</AppButton
            >
            <AppButton
              @click="currentTaskStore.goToNextTask(currentProject.ID)"
              class="continue"
              size="custom"
              :is-loading="currentTaskStore.isLoading"
              >Далее</AppButton
            >
          </HStack>
        </VStack>
      </HStack>
      <ApproveAnswerModal
        :on-close="closeModal"
        :is-open="isVisible"
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
import ImageSwiper from '../ImageSwiper/ImageSwiper.vue'
import ProjectTaskForm from '@/features/AnswerTaskForm'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { type Project } from '@/entities/Project'
import { onMounted, onUnmounted } from 'vue'
import { routes } from '@/shared/const/routes'
import { taskErrorsMapper } from '../../const/serverErrors'
import TaskIndex from '../TaskIndex/TaskIndex.vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import ApproveAnswerModal from '../ApproveAnswerModal/ApproveAnswerModal.vue'
import ApproveAutoFillModal from '../ApproveAutoFillModal/ApproveAutoFillModal.vue'

const currentTaskStore = useCurrentTaskStore()
const [isVisible, { openModal, closeModal, extra }] = useModal()

interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()

const onChange = (value: string) => {
  currentTaskStore.setAnswer(value)
}

const onApproveAnswer = () => {
  currentTaskStore.goToNextTask(props.currentProject.ID)
  closeModal()
}

const onApproveAutoFill = () => {}

const onArrowDown = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight' && !isVisible.value) {
    openModal()
  }
}

onMounted(() => {
  if (props.currentProject) {
    currentTaskStore.fetchCurrentTask(props.currentProject.ID)
  }
  document.body.addEventListener('keydown', onArrowDown)
})

onUnmounted(() => {
  currentTaskStore.resetAnswer()
  document.body.removeEventListener('keydown', onArrowDown)
})
</script>

<style scoped>
.container {
  width: 1680px;
  margin: 0 auto;
}

.form {
  margin-top: 100px;
  width: 720px;
}

.continue {
  width: 120px;
  padding: 15px 30px;
  margin-top: 30px;
}
</style>
