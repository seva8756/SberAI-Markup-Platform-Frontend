<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from "@/app/components/layout/Navbar.vue";
import  '@/app/styles/variables/global.scss'
</script>

<template>
  <div class="app">
    <Navbar/>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.app {
  background-color: var(--background-color-primary);
  min-height: 100vh;
}
</style>
