<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import TasksPagination from '@/features/TasksPagination'
import ChoiceTask from '../Tasks/ChoiceTask.vue'
import ImageTask from '../Tasks/ImageTask.vue'
import TextTask from '../Tasks/TextTask.vue'
import type { Project } from '@/entities/Project'
import { AnswerType } from '@/entities/Task'

const currentTaskStore = useCurrentTaskStore()
interface ProjectTaskMobileProps {
  currentProject: Project
  onChangeCurrentTask: (payload: { id: number; index: number }) => void
}

defineProps<ProjectTaskMobileProps>()
</script>

<template>
  <VStack gap="20" class="task-mobile">
    <div class="container">
      <div class="wrapper">
        <TasksPagination
          :no-tasks-available="currentTaskStore.noTasksAvailable"
          :is-loading="currentTaskStore.isLoading"
          :tasks-ids="currentProject.completed_tasks"
          :current-index="currentTaskStore.currentPaginationIndex"
          @on-change-current-task="onChangeCurrentTask"
        />
      </div>
    </div>
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
</template>

<style scoped lang="scss">
.task-mobile {
  padding-top: calc(var(--mobile-navbar-task) + 20px);
  padding-bottom: 70px;
}

.wrapper {
  width: 100%;
  height: 42px;
  position: relative;
}
</style>
