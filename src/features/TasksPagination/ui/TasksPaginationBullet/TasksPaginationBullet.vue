<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'

interface TasksPaginationBullet {
  id: number
  active: boolean
  solved: boolean
}
defineProps<TasksPaginationBullet>()
</script>

<template>
  <VStack align="center" justify="center" :class="['bullet', { active }, { solved }]">
    <AppText>{{ id }}</AppText>
  </VStack>
</template>

<style scoped lang="scss">
.bullet {
  width: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  background: var(--accent-color-super-muted);
}

.active {
  border: 1px solid var(--text-color);
}

.solved {
  background: var(--accent-color);
}
</style>
