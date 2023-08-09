<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from '@/shared/ui/layouts/MainLayout/MainLayout.vue'
import { useUserStore } from '@/entities/User'
import { NavBar } from '@/widgets/NavBar'
import AppLoaderLayout from '@/widgets/AppLoaderLayout'
import { watchEffect } from 'vue'
import { useProjectsListStore } from '@/entities/Project'
import { NotificationList } from '@/entities/Notification'

const userStore = useUserStore()
const projectListStore = useProjectsListStore()
watchEffect(() => {
  if (userStore.mounted) {
    projectListStore.fetchProjects()
  }
})
</script>

<template>
  <MainLayout :navbar="NavBar" v-if="userStore.mounted">
    <RouterView />
  </MainLayout>
  <div v-else>
    <AppLoaderLayout />
  </div>
  <NotificationList />
</template>

<style scoped></style>
