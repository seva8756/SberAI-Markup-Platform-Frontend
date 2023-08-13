<script setup lang="ts">
import TasksPaginationBullet from '../TasksPaginationBullet/TasksPaginationBullet.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import ArrowIcon from '@/shared/assets/icons/arrow_down.svg'
import ArrowLeft from '@/shared/assets/icons/arrow_left.svg'
import TasksPaginationBulletSkeleton from '../TasksPaginationBullet/TasksPaginationBulletSkeleton.vue'
import { computed, ref } from 'vue'
import { getHStack } from '@/shared/lib/helpers/getHStack'

interface TasksPaginationProps {
  tasksIds: number[]
  isLoading: boolean
  currentIndex: number
}

const props = defineProps<TasksPaginationProps>()

const emits = defineEmits(['onChangeCurrentTask'])

const isOpen = ref(false)
const currentPage = ref(0)

const blocksNumber = 50

const quantityGridBlocks = computed(() => {
  return Math.ceil(props.tasksIds.length / 28)
})

const onClick = (id: number, index: number) => {
  emits('onChangeCurrentTask', { id, index })
}
const goNextPage = () => {
  if (currentPage.value + 1 < quantityGridBlocks.value) currentPage.value++
}

const goPrevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}
</script>

<template>
  <div class="tasks-pagination-wrapper">
    <HStack gap="30" align="start" :class="['tasks-pagination', { opened: isOpen }]">
      <button class="arrow" @click="isOpen = !isOpen">
        <ArrowIcon />
      </button>
      <div class="grid-wrapper">
        <HStack
          class="grid-container"
          :style="{ transform: `translateX(-${currentPage * 420}px)` }"
        >
          <HStack
            v-for="n in quantityGridBlocks"
            :key="n"
            class="pagination-grid"
            max
            justify="end"
          >
            <template v-if="isLoading">
              <TasksPaginationBulletSkeleton v-for="n in 3" :key="n" />
            </template>
            <template v-else>
              <TasksPaginationBullet
                v-for="(ID, index) in tasksIds"
                @click="onClick(ID, index)"
                :key="index"
                :increased="isOpen"
                :id="ID"
                :active="index === currentIndex"
                :solved="index + 1 < tasksIds.length"
              />
            </template>
          </HStack>
        </HStack>
      </div>
      <button
        @click="goPrevPage"
        :disabled="quantityGridBlocks === 1"
        :class="[
          'arrow-btn',
          getHStack({ justify: 'center' }),
          { disabled: quantityGridBlocks === 1 }
        ]"
      >
        <ArrowIcon />
      </button>
      <button
        @click="goNextPage"
        :disabled="quantityGridBlocks === 1"
        :class="[
          'arrow-btn',
          'reversed',
          getHStack({ justify: 'center' }),
          { disabled: quantityGridBlocks === 1 }
        ]"
      >
        <ArrowIcon />
      </button>
    </HStack>
  </div>
</template>

<style scoped lang="scss">
.tasks-pagination-wrapper {
  position: absolute;
  right: 0;
  top: 0;
}

.tasks-pagination {
  position: relative;
  padding: 16px 52px;
  width: 594px;
  height: 68px;
  overflow: hidden;
  border-radius: 30px;
  transition: height var(--transition-duration);
  background: var(--gray-secondary);
  box-shadow: 0px 10px 26px 2px rgba(0, 0, 0, 0.4);
}

.grid-container {
  transition: transform var(--transition-duration);
}

.arrow-btn {
  position: absolute;
  top: 110px;
  left: 30px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  background: rgba(217, 217, 217, 0.22);

  &.disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  svg {
    transform: rotate(90deg);
    height: 8px;
  }
}

.reversed {
  left: auto;
  right: 20px;

  svg {
    transform: rotate(-90deg);
    height: 8px;
  }
}

.grid-wrapper {
  width: 422px;
  max-height: 35px;
  overflow: hidden;
}

.arrow {
  min-width: 23px;
  height: 13px;
  margin-top: 10px;
  cursor: pointer;
  background: none;
  transition: transform var(--transition-duration);
}

.pagination-grid {
  min-width: 420px;
  max-height: 238px;
  flex-wrap: wrap;
  gap: 10px;
  transition: gap var(--transition-duration);
}

.opened {
  height: 277px;
  .pagination-grid {
    gap: 14px;
  }
  .grid-wrapper {
    max-height: 238px;
  }
  .arrow {
    transform: rotate(180deg);
  }
}
</style>
