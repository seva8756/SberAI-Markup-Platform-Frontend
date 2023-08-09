<template>
  <ProjectList
    :is-loading="projectsListStore.isLoading"
    :projects="filteredProjects"
    :category="projectsListStore.category"
  />
</template>

<script setup lang="ts">
import ProjectList, { ProjectsFilterCategory, useProjectsListStore } from '@/entities/Project'
import { computed } from 'vue'
const projectsListStore = useProjectsListStore()
const filteredProjects = computed(() => {
  switch (projectsListStore.category) {
    case ProjectsFilterCategory.ALL:
      return projectsListStore.projects
    case ProjectsFilterCategory.ARCHIVE:
      return []
    default:
      return []
  }
})
</script>

<style scoped></style>
