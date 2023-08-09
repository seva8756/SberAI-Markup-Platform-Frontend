<script setup lang="ts">
import { useRoute } from 'vue-router'
import { type Project, useProjectsListStore } from '@/entities/Project'
import { computed } from 'vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'

const { params } = useRoute()
const projectListStore = useProjectsListStore()

const projectId = params.id as string
const currentProject = computed<Project | undefined>(() =>
  projectListStore.getProjectById(projectId)
)
const route = useRoute()
</script>

<template>
  <template v-if="currentProject">
    <router-view :current-project="currentProject" />
  </template>
  <template v-else>
    <AppText>Project not found</AppText>
  </template>
</template>

<style></style>
