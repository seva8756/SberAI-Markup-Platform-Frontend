<script setup lang="ts">
import { useRoute } from 'vue-router'
import { routes } from '@/shared/const/routes'
import type { VueElement } from 'vue'
const route = useRoute()

defineProps({
  navbar: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <component :is="navbar" v-if="route.fullPath !== routes.auth()" />
  <slot />
</template>

<style scoped lang="scss"></style>
