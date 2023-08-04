<template>
  <div class="container">
    <template v-if="currentProject">
      <VStack gap="10">
        <AppText size="xl" weight="700">{{ currentProject.title }}</AppText>
        <AppText variant="secondary" size="l">Код задания : X223SDF</AppText>
      </VStack>
      <hr class="line" />
      <VStack gap="24">
        <AppText size="xl" weight="600"
          >В ходе выполнения размертки вам будет попадаться задания разных типов</AppText
        >
        <ol :class="[getVStack({ gap: '24' })]">
          <li
            v-for="(rule, index) in welcomeRules"
            :class="[getVStack({ gap: '24' })]"
            :key="index"
          >
            <AppText size="xl" weight="600">{{ `${index + 1}. ${rule.title}` }}</AppText>
            <AppText size="l">{{ rule.desc }}</AppText>
          </li>
        </ol>
        <AppButton button-tag="link" size="l" :to="routes.project_task(projectId)">
          Приступить к выполнению
        </AppButton>
      </VStack>
    </template>
    <template v-else>
      <div>Error while getting project</div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { welcomeRules } from '../../const/welcomeRules'
import { getVStack } from '@/shared/lib/helpers/getVStack'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { routes } from '@/shared/const/routes'
import { useRoute } from 'vue-router'
import { useProjectsListStore, type Project } from '@/entities/Project'
import { computed } from 'vue'

const { params } = useRoute()
const projectId = params.id as string
const projectListStore = useProjectsListStore()
const currentProject = computed<Project | undefined>(() =>
  projectListStore.getProjectById(projectId)
)
</script>

<style scoped>
.container {
  width: 1140px;
  margin: 0 auto;
}

.line {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
