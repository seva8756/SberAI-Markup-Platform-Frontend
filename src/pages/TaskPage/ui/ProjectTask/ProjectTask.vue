<template>
  <div class="container">
    <template v-if="currentTaskStore.error">
      <VStack gap="24">
        <AppText size="xl">{{ taskErrorsMapper[currentTaskStore.error] }}</AppText>
        <AppButton button-tag="link" :to="routes.projects()">На главную</AppButton>
      </VStack>
    </template>
    <template v-else>
      <HStack justify="between" align="end">
        <VStack gap="50" align="start">
          <VStack align="start">
            <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
          </VStack>
          <ImageSwiper
            :images="currentTaskStore.currentTask?.images"
            :is-loading="currentTaskStore.isLoading"
          />
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
          <AppButton
            @click="currentTaskStore.fetchCurrentTask(currentProject.ID)"
            class="continue"
            size="custom"
            :is-loading="currentTaskStore.isLoading"
            >Далее</AppButton
          >
        </VStack>
      </HStack>
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
import { computed, onMounted } from 'vue'
import { routes } from '@/shared/const/routes'
import { taskErrorsMapper } from '../../const/serverErrors'
const { params } = useRoute()
// const projectId = params.id as string
const projectListStore = useProjectsListStore()
// const currentProject = computed<Project | undefined>(() =>
//   projectListStore.getProjectById(projectId)
// )

const currentTaskStore = useCurrentTaskStore()
const projectsListStore = useProjectsListStore()

interface ProjectTaskProps {
  currentProject: Project
}

const props = defineProps<ProjectTaskProps>()

const onChange = (value: string) => {
  currentTaskStore.setAnswer(value)
}

onMounted(() => {
  if (props.currentProject) {
    currentTaskStore.fetchCurrentTask(props.currentProject.ID)
  }
})
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
