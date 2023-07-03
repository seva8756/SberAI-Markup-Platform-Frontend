<script setup lang="ts">
import '@/app/styles/variables/global.scss'
</script>

<template>
  <div class="panel">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .panel {
    min-width: 930px;
    min-height: 150px;
    flex-shrink: 0;
    border-radius: 20px;
    background: var(--background-color-secondary);
    justify-content: center;
    display: flex;
    margin: 20px;
  }
</style>