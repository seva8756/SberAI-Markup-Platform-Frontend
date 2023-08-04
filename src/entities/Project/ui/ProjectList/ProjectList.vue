<script setup lang="ts">
import type { PropType } from 'vue'
import type { Project } from '../../model/types/project'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import ProjectCard from '../ProjectCard/ProjectCard.vue'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    default: () => []
  }
})
</script>

<template>
  <VStack gap="24" max>
    <ProjectCard v-for="project in projects" :key="project.ID" :project="project" />
  </VStack>
</template>
