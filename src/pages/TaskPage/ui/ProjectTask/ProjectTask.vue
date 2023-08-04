<template>
  <div class="container">
    <template v-if="currentTaskStore.currentTask && currentProject">
      <HStack justify="between" align="end">
        <VStack gap="50" align="start">
          <VStack align="start">
            <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
            <AppText size="l" variant="secondary">Название проекта</AppText>
          </VStack>
          <ImageSwiper :images="currentTaskStore.currentTask.images" />
        </VStack>
        <VStack>
          <ProjectTaskForm
            :current-task="currentTaskStore.currentTask"
            :on-change-choice="onChange"
            :project="currentProject"
            :model-value="currentTaskStore.answer"
            question="Какие цвета преобладают?"
            :is-loading="currentTaskStore.isLoading"
          />
          <AppButton class="continue" size="custom" :is-loading="currentTaskStore.isLoading"
            >Далее</AppButton
          >
        </VStack>
      </HStack>
    </template>
    <template v-else>
      <AppText variant="error">Error while getting task</AppText>
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
import { type Project, useProjectsListStore } from '@/entities/Project'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const { params } = useRoute()
const projectId = params.id as string
const projectListStore = useProjectsListStore()
const currentProject = computed<Project | undefined>(() =>
  projectListStore.getProjectById(projectId)
)

const currentTaskStore = useCurrentTaskStore()
const projectsListStore = useProjectsListStore()

const onChange = (value: string) => {
  currentTaskStore.setAnswer(value)
}
</script>

<style scoped>
.container {
  width: 1680px;
  margin: 0 auto;
}

.header {
  margin-bottom: 30px;
  padding-left: 60px;
}

.continue {
  width: 150px;
  height: 70px;
  margin-top: 30px;
  margin-left: auto;
}
</style>
