<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from "@/app/components/layout/Navbar.vue";
import  '@/app/styles/variables/global.scss'
</script>

<template>
  <link href='https://fonts.googleapis.com/css?family=Montserrat' rel='stylesheet'>
  <div class="app">
    <Navbar username="Имя пользователя" role="Root"/>
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
