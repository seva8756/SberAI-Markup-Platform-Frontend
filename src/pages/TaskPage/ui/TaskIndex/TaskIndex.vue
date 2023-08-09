<script setup lang="ts">
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import { computed } from 'vue'

interface TaskIndexProps {
  isLoading: boolean
  index?: string
}

defineProps<TaskIndexProps>()

const taskNumber = computed(() => {
  return (index: string | undefined) => (index ? index.padStart(3, '0') : '')
})
</script>

<template>
  <template v-if="!index">
    <AppText size="l" variant="secondary" weight="500"> Недоступный номер </AppText>
  </template>
  <template v-else>
    <div v-if="isLoading">
      <AppSkeleton class="skeleton" />
    </div>
    <div v-else>
      <AppText size="l" variant="secondary" weight="500"
        >Код задания: #{{ taskNumber(index) }}</AppText
      >
    </div></template
  >
</template>

<style scoped lang="scss">
.skeleton {
  width: 65px;
  height: 30px;
}
</style>
