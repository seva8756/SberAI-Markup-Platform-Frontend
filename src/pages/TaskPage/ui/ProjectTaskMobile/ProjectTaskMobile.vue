<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import { useTaskStore } from '../../model/store/currentTaskStore'
import TasksPagination from '@/features/TasksPagination'
import type { Project } from '@/entities/Project'
import ComponentsConstructor from '../ComponentsConstructor/ComponentsConstructor.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'

const currentTaskStore = useTaskStore()
interface ProjectTaskMobileProps {
  currentProject: Project
  onChangeCurrentTask: (payload: { id: number; index: number }) => void
}

defineProps<ProjectTaskMobileProps>()
</script>

<template>
  <VStack gap="30" class="task-mobile">
    <VStack gap="16" class="container">
      <div class="wrapper">
        <TasksPagination
          :no-tasks-available="currentTaskStore.noTasksAvailable"
          :is-loading="currentTaskStore.isLoading"
          :tasks-ids="currentProject.completed_tasks"
          :current-index="currentTaskStore.currentPaginationIndex"
          @on-change-current-task="onChangeCurrentTask"
        />
      </div>
      <ComponentsConstructor :components="currentProject.components" />
      <HStack class="btn_wrapper">
        <AppButton
          size="custom"
          class="continue"
          @click="currentTaskStore.goToNextTask(currentProject.ID)"
          :is-loading="currentTaskStore.isLoading"
          >Далее</AppButton
        >
      </HStack>
    </VStack>
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

.btn_wrapper {
  margin-top: 50px;
  align-self: end;
}
</style>
