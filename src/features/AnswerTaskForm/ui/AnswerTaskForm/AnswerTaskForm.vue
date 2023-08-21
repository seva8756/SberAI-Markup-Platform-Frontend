<template>
  <VStack :class="isMobile ? 'container' : 'form'" align="start" gap="30">
    <AppText :size="isMobile ? 'l' : 'xl'" weight="500">{{ question }}</AppText>
    <AnswerVariants
      v-if="project.answer_type === AnswerType.CHOICE"
      :is-loading="isLoading"
      v-model="answer"
      :variants="project.answer_choice"
    />
    <AnswerTextArea
      v-else-if="project.answer_type === AnswerType.TEXT"
      :is-loading="isLoading"
      v-model="answer"
      placeholder="Введите ответ"
    />
    <AnswerTextArea
      v-else
      v-model="extendedAnswer"
      :is-loading="isLoading"
      placeholder="Опишите изображение"
    />
    <HStack justify="between" max>
      <AutoFillButton
        v-if="project.answer_type === AnswerType.TEXT"
        :model-value="isAutoFill"
        :on-change="onChangeAutoFill"
      />
      <HStack v-if="isMobile" max gap="4" class="mobile_buttons">
        <AppButton @click="$emit('onPrev')" class="nav-button" size="custom">
          <ArrowLeftIcon width="30" height="30" />
        </AppButton>
        <AppButton
          v-if="noTasksAvailable ? true : !isLastTask"
          @click="onSave"
          color="gray"
          class="save-btn"
          size="custom"
          :disabled="isSaveDisabled"
          >Save</AppButton
        >
        <AppButton
          v-if="noTasksAvailable ? !isLastTask : true"
          @click="onNext"
          class="nav-button right"
          size="custom"
        >
          <ArrowRightIcon width="30" height="30" />
        </AppButton>
      </HStack>
      <HStack v-else gap="30" max justify="end">
        <AppButton
          v-if="noTasksAvailable ? true : !isLastTask"
          class="continue"
          size="custom"
          :disabled="isSaveDisabled"
          @click="onSave"
          >Сохранить</AppButton
        >
        <AppButton @click="$emit('onPrev')" color="gray" class="continue" size="custom">
          Назад
        </AppButton>
        <AppButton
          v-if="noTasksAvailable ? !isLastTask : true"
          @click="onNext"
          class="continue"
          size="custom"
          :is-loading="isLoading"
          >Далее</AppButton
        >
      </HStack>
    </HStack>
  </VStack>
  <ApproveAutoFillModal
    :on-close="closeModal"
    :is-open="extra === 'ApproveAutoFillModal'"
    @on-approve="fillTextAnswer(currentTask)"
  />
</template>

<script setup lang="ts">
import ArrowLeftIcon from '@/shared/assets/icons/arrow_left.svg'
import ArrowRightIcon from '@/shared/assets/icons/arrow_right.svg'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { AnswerType, type Task } from '@/entities/Task'
import type { Project } from '@/entities/Project'
import AnswerVariants from '../AnswerVariants/AnswerVariants.vue'
import AnswerTextArea from '../AnswerTextArea/AnswerTextArea.vue'
import { useAnswerTaskStore } from '../../model/store/answerTaskStore'
import { storeToRefs } from 'pinia'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AutoFillButton from '../AutoFillButton/AutoFillButton.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import ApproveAutoFillModal from '../ApproveAutoFillModal/ApproveAutoFillModal.vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import { NotificationType, useNotificationStore } from '@/entities/Notification'
import { computed, onUnmounted } from 'vue'
import { isMobile } from 'mobile-device-detect'

const emits = defineEmits(['onNext', 'onPrev', 'onSave'])

interface AnswerTaskFormProps {
  question: string
  currentTask: Task | null
  project: Project
  isLoading: boolean
  isLastTask: boolean
  noTasksAvailable: boolean
}

const props = defineProps<AnswerTaskFormProps>()

const answerTaskStore = useAnswerTaskStore()
const { addNotification } = useNotificationStore()
const { answer, isAutoFill, extendedAnswer } = storeToRefs(answerTaskStore)
const { fillTextAnswer, setIsAutoFill, setFileName } = answerTaskStore
const [isVisible, { openModal, closeModal, extra }] = useModal()

const isSaveDisabled = computed(() => {
  return (
    answer?.value === props.currentTask?.answer &&
    extendedAnswer?.value === props.currentTask?.answer_extended
  )
})

const onChangeAutoFill = (value: boolean) => {
  setIsAutoFill(value)
  if (props.currentTask) {
    if (answer?.value && isAutoFill.value) {
      openModal('ApproveAutoFillModal')
    } else if (!answer?.value && isAutoFill.value) {
      fillTextAnswer(props.currentTask)
    }
  }
}

const onNext = () => {
  if (answer?.value) {
    emits('onNext', { answer: answer.value, answer_extended: extendedAnswer?.value })
  } else {
    addNotification({
      message: 'Заполните ответ',
      notificationType: NotificationType.ERROR
    })
  }
}

const onSave = () => {
  if (answer?.value) {
    emits('onSave', { answer: answer.value, answer_extended: extendedAnswer?.value })
  } else {
    addNotification({
      message: 'Заполните ответ',
      notificationType: NotificationType.ERROR
    })
  }
}
</script>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.form {
  width: 720px;
  @include laptop {
    width: 595px;
  }
  @include mobile {
    width: 100%;
  }
}

.continue {
  width: 120px;
  height: 52px;
  padding: 15px 30px;
}

.mobile_buttons {
  position: fixed;
  height: 50px;
  bottom: 0;
  left: 0;
}

.nav-button {
  flex: 1;
  height: 100%;
  border-radius: 0 10px 0 0;

  &.right {
    border-radius: 10px 0 0 0;
  }
}

.save-btn {
  flex: 0.5;
  height: 100%;
  border-radius: 10px 10px 0 0;
}
</style>
