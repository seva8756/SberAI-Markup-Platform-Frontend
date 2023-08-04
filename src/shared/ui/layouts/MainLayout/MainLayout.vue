<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()

defineProps({
  navbar: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <component :is="navbar" v-if="!route.meta.customLayout" />
  <div :class="{ content: !route.meta.customLayout }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.content {
  margin-top: var(--navbar-height);
  padding-top: 80px;
}
</style>
