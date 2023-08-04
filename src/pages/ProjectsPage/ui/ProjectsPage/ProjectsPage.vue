<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import UsersProjects from '../UsersProjects/UsersProjects.vue'
import ProjectsListHeader from '../ProjectsListHeader/ProjectsListHeader.vue'
</script>

<template>
  <VStack gap="50">
    <ProjectsListHeader />
    <UsersProjects />
  </VStack>
</template>

<style scoped lang="scss"></style>
