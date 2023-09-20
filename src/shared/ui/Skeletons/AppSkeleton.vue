<template>
  <div :class="['skeleton', { constructor: isConstructor }]" :style="{ borderRadius }" />
</template>

<script setup lang="ts">
interface AppSkeletonProps {
  borderRadius?: string
  isConstructor?: boolean
}
defineProps<AppSkeletonProps>()
</script>

<style lang="scss" scoped>
@import '@/shared/styles/mixins';
.skeleton {
  background: #eee;
  background: linear-gradient(110deg, #151c1f 8%, #090f11 18%, #151c1f 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

.constructor {
  flex: 1 0 45%;
  height: 525px;
  @include mobile {
    height: 325px;
  }
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
