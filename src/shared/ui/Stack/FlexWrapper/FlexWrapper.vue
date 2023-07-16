<script setup lang="ts">
import type { PropType } from 'vue'

export type FlexJustify = 'start' | 'end' | 'between' | 'center'
export type FlexAlign = 'start' | 'end' | 'center' | 'stretch'
export type FlexDirection = 'row' | 'column'
export type FlexGap = '4' | '8' | '10' | '16' | '24' | '30' | '50' | '85'

const justifyClasses: Record<FlexJustify, string> = {
  start: 'justifyStart',
  center: 'justifyCenter',
  end: 'justifyEnd',
  between: 'justifyBetween'
}

const alignClasses: Record<FlexAlign, string> = {
  start: 'alignStart',
  center: 'alignCenter',
  end: 'alignEnd',
  stretch: 'alignStretch'
}

const directionClasses: Record<FlexDirection, string> = {
  row: 'directionRow',
  column: 'directionColumn'
}

const gapClasses: Record<FlexGap, string> = {
  4: 'gap4',
  8: 'gap8',
  10: 'gap10',
  16: 'gap16',
  24: 'gap24',
  30: 'gap30',
  50: 'gap50',
  85: 'gap85'
}

defineProps({
  direction: {
    type: String as PropType<FlexDirection>,
    default: 'row'
  },
  justify: {
    type: String as PropType<FlexJustify>,
    default: 'justify'
  },
  gap: {
    type: String as PropType<FlexGap>
  },
  max: {
    type: Boolean,
    default: false
  },
  align: {
    type: String as PropType<FlexAlign>,
    default: 'center'
  }
})
</script>

<template>
  <div
    :class="[
      'flex',
      directionClasses[direction],
      justifyClasses[justify],
      alignClasses[align],
      gap && gapClasses[gap],
      { max: max }
    ]"
  >
    <slot />
  </div>
</template>

<style scoped lang="scss">
.flex {
  display: flex;
}

.justifyStart {
  justify-content: flex-start;
}

.justifyCenter {
  justify-content: center;
}

.justifyEnd {
  justify-content: flex-end;
}

.justifyBetween {
  justify-content: space-between;
}

.alignStart {
  align-items: flex-start;
}

.alignCenter {
  align-items: center;
}

.alignEnd {
  align-items: flex-end;
}

.alignStretch {
  align-items: stretch;
}

.directionColumn {
  flex-direction: column;
}

.directionRow {
  flex-direction: row;
}

.gap4 {
  gap: 4px;
}

.gap8 {
  gap: 8px;
}

.gap10 {
  gap: 10px;
}

.gap16 {
  gap: 16px;
}

.gap24 {
  gap: 24px;
}

.gap30 {
  gap: 30px;
}

.gap50 {
  gap: 50px;
}

.gap85 {
  gap: 85px;
}

.max {
  width: 100%;
}
</style>
