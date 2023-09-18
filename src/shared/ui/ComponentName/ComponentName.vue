<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'

defineProps({
  name: String
})
</script>

<template>
  <div class="component-name">
    <AppText>
      {{ name }}
    </AppText>
  </div>
</template>

<style scoped lang="scss">
.component-name {
  padding: 10px 35px;
  border-radius: 32px 32px 0 0;
  background: var(--gray-secondary);
}
</style>
