<script setup lang="ts">
import '@/app/styles/variables/global.scss'
const props = defineProps({
  type: {
    type: String,
    default: ""
  },
})
</script>

<template>
  <div :class="['panel', `panel_${type}`]">
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

    &_accented {
      border: 3px solid var(--accent-color);
    }
    &_info {
      border-radius: 15px;
      border: 3px solid #505050;
      background: transparent;
    }
  }
</style>