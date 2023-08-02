<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainLayout from '@/shared/ui/layouts/MainLayout/MainLayout.vue'
import { useUserStore } from '@/entities/User'
import { NavBar } from '@/widgets/NavBar'
import AppLoaderLayout from '@/widgets/AppLoaderLayout'

const userStore = useUserStore()
</script>

<template>
  <MainLayout :navbar="NavBar" v-if="userStore.mounted">
    <RouterView />
  </MainLayout>
  <div v-else>
    <AppLoaderLayout />
  </div>
</template>

<style scoped></style>
