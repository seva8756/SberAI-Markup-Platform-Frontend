<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from '@/widgets/MainLayout/ui/MainLayout.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import { useUserStore } from '@/entities/User'
import NavBar from '@/widgets/NavBar'

const userStore = useUserStore()
</script>

<template>
  <MainLayout :navbar="NavBar" v-if="userStore.mounted">
    <RouterView />
  </MainLayout>
  <div v-else>
    <AppSkeleton />
  </div>
</template>

<style scoped></style>
