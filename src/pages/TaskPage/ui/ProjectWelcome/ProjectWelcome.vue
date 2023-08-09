<template>
  <div class="welcome-container">
    <VStack gap="10">
      <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
    </VStack>
    <hr class="line" />
    <VStack gap="24">
      <AppText size="xl" weight="600"
        >В ходе выполнения размертки вам будет попадаться задания разных типов</AppText
      >
      <ol :class="[getVStack({ gap: '24' })]">
        <li v-for="(rule, index) in welcomeRules" :class="[getVStack({ gap: '24' })]" :key="index">
          <AppText size="xl" weight="600">{{ `${index + 1}. ${rule.title}` }}</AppText>
          <AppText size="l">{{ rule.desc }}</AppText>
        </li>
      </ol>
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

<style scoped>
.welcome-container {
  width: 1140px;
  margin: 0 auto;
}

.line {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
