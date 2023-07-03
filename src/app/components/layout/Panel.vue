<script setup lang="ts">
import '@/app/styles/variables/global.scss'
const props = defineProps({
  accented: {
    type: Boolean,
    required: false
  },
})
</script>

<template>
  <div :class="['panel', {'panel_accented': accented}]">
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
  }
</style>