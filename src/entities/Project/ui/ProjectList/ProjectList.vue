<script setup lang="ts">
import type { PropType } from 'vue'
import type { Project } from '@/entities/Project/model/types/project'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import ProjectCard from '@/entities/Project/ui/ProjectCard/ProjectCard.vue'

defineProps({
  projects: {
    type: Array as PropType<Project[]>,
    default: () => []
  }
})
</script>

<template>
  <VStack gap="24" max>
    <ProjectCard v-for="n in 10" :key="n" :project="{ title: '' }" />
  </VStack>
</template>
