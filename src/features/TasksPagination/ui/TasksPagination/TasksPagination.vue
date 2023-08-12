<script setup lang="ts">
import TasksPaginationBullet from '../TasksPaginationBullet/TasksPaginationBullet.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import TasksPaginationBulletSkeleton from '../TasksPaginationBullet/TasksPaginationBulletSkeleton.vue'

interface TasksPaginationProps {
  tasksIds: number[]
  isLoading: boolean
  currentIndex: number
}

const props = defineProps<TasksPaginationProps>()

const emits = defineEmits(['onChangeCurrentTask'])
const onClick = (id: number, index: number) => {
  emits('onChangeCurrentTask', { id, index })
}
</script>

<template>
  <HStack gap="10" class="tasks-pagination">
    <template v-if="isLoading">
      <TasksPaginationBulletSkeleton v-for="n in 3" :key="n" />
    </template>
    <template v-else>
      <TasksPaginationBullet
        v-for="(ID, index) in tasksIds"
        @click="onClick(ID, index)"
        :key="index"
        :id="ID"
        :active="index === currentIndex"
        :solved="index + 1 < tasksIds.length"
      />
    </template>
  </HStack>
</template>

<style scoped lang="scss"></style>
