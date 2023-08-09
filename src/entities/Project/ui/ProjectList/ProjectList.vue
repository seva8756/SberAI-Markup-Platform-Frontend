<script setup lang="ts">
import type { PropType } from 'vue'
import type { Project } from '../../model/types/project'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import ProjectCard from '../ProjectCard/ProjectCard.vue'
import ProjectCardSkeleton from '../ProjectCard/ProjectCardSkeleton.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import EmptyProjects from '../EmptyProjects.vue'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    default: () => []
  },
  isLoading: {
    type: Boolean
  }
})
</script>

<template>
  <VStack gap="24" max>
    <template v-if="isLoading">
      <ProjectCardSkeleton v-for="n in 3" :key="n" />
    </template>
    <template v-else>
      <template v-if="projects.length">
        <ProjectCard v-for="project in projects" :key="project.ID" :project="project" />
      </template>
      <template v-else>
        <EmptyProjects />
      </template>
    </template>
  </VStack>
</template>
