<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from "@/app/components/Navbar.vue";
import  '@/app/styles/variables/global.scss'
</script>

<template>
  <div class="container">
    <Navbar/>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped></style>
