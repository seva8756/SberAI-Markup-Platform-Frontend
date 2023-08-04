<template>
  <ProjectList :projects="projectsListStore.projects" />
</template>

<script setup lang="ts">
import ProjectList, { useProjectsListStore } from '@/entities/Project'
const projectsListStore = useProjectsListStore()
</script>

<style scoped></style>
