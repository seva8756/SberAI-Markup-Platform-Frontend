<template>
  <div class="skeleton"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.skeleton {
  background: #eee;
  background: linear-gradient(110deg, #151c1f 8%, #090f11 18%, #151c1f 33%);
  border-radius: 5px;
  background-size: 200% 100%;
  animation: 1.5s shine linear infinite;
}

@keyframes shine {
  to {
    background-position-x: -200%;
  }
}
</style>
