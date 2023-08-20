<template>
  <div class="welcome-container">
    <VStack gap="10">
      <AppText :align="isMobile ? 'center' : 'left'" size="xl" weight="700">{{
        currentProject.title
      }}</AppText>
      <AppText size="l" variant="secondary" weight="400"
        >Код проекта: {{ currentProject.code }}</AppText
      >
    </VStack>
    <hr class="line" />
    <VStack gap="24">
      <AppText :align="isMobile ? 'center' : 'left'" size="xl" weight="600"
        >В ходе выполнения размертки вам будет попадаться задания разных типов</AppText
      >
      <VStack :align="isMobile ? 'center' : 'start'" max gap="24">
        <AppText size="xl" weight="600">{{
          welcomeRules[currentProject.answer_type].title
        }}</AppText>
        <AppText :align="isMobile ? 'center' : 'left'" size="l">{{
          welcomeRules[currentProject.answer_type].desc
        }}</AppText>
      </VStack>
      <AppButton button-tag="link" :to="routes.project_task(currentProject.ID.toString())" size="l">
        Приступить к выполнению
      </AppButton>
    </VStack>
  </div>
</template>

<script setup lang="ts">
import { welcomeRules } from '../../const/welcomeRules'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { routes } from '@/shared/const/routes'
import { useRoute, useRouter } from 'vue-router'
import { useProjectsListStore, type Project } from '@/entities/Project'
import { computed } from 'vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { isMobile } from 'mobile-device-detect'

const { params } = useRoute()
const router = useRouter()

interface ProjectWelcomeProps {
  currentProject: Project
}

const props = defineProps<ProjectWelcomeProps>()
// const projectId = params.id as string
const projectListStore = useProjectsListStore()
const currentTaskStore = useCurrentTaskStore()
// const currentProject = computed<Project | undefined>(() =>
//   projectListStore.getProjectById(projectId)
// )
const startTasks = async () => {
  if (props.currentProject) {
    await currentTaskStore.fetchCurrentTask(props.currentProject.ID)
    await router.push(routes.project_task(props.currentProject.ID.toString()))
  }
}
</script>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.welcome-container {
  width: 1140px;
  margin: 0 auto;
}

@include mobile {
  .welcome-container {
    width: 100%;
    padding: 0 15px;
  }
}

.line {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
