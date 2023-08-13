<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type Project, useProjectsListStore } from '@/entities/Project'
import { computed, onMounted, watchEffect } from 'vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'

const { params } = useRoute()
const projectListStore = useProjectsListStore()
const currentTaskStore = useCurrentTaskStore()

const projectId = params.id as string
const currentProject = computed<Project | undefined>(() =>
  projectListStore.getProjectById(projectId)
)
watchEffect(() => {
  if (currentProject.value) {
    currentTaskStore.setCurrentProject(currentProject.value)
  }
})
// onMounted(() => {
//   console.log(currentProject.value)
// })
</script>

<template>
  <div class="container">
    <template v-if="currentProject">
      <router-view :current-project="currentProject" />
    </template>
    <template v-else>
      <AppText align="center" size="xl">Проект не найден</AppText>
    </template>
  </div>
</template>

<style scoped>
.container {
  width: 1680px;
  margin: 0 auto;
}
</style>
