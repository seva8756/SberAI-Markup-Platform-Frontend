<script setup lang="ts">
import { type PropType, VueElement } from 'vue'

type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'long'
type ButtonColor = 'primary' | 'muted'
type ButtonBorder = 'normal' | 'dashed'
type ButtonType = 'normal' | 'square'

defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  fullRound: {
    type: Boolean,
    default: false
  },
  Suffix: {
    type: VueElement
  },
  color: {
    type: String as PropType<ButtonColor>,
    default: 'primary'
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'm'
  },
  border: {
    type: String as PropType<ButtonBorder>,
    default: 'normal'
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'normal'
  }
})
</script>

<template>
  <button :class="['Button', color, size,{ 'full-round': fullRound }, border, type]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.Button {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: var(--font-size-m);
  font-weight: 400;
  padding: 10px 15px;
  border-radius: 22.5px;
  border: none;
  outline: none;
  transition: background 0.3s;
}

.full-round {
  border-radius: 50%;
}

.primary {
  background: var(--accent-color);
  color: var(--text-color);

  &:hover {
    background: var(--accent-color-muted);
  }
}

.muted {
  background: var(--accent-color-super-muted);
  color: var(--text-color);
}

.s {
  width: 210px;
  font-size: 14px;
}

.m {
  width: 250px;
}

.xs {
  height: 35px;
  width: 147px;
  font-size: 14px
}

.long{
  width: 298px;
  height: 45px;
}

.dashed {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18.5' ry='18.5' stroke='%2321A049FF' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='0' /%3e%3c/svg%3e");
  background-color: transparent;
  color: var(--accent-color);

  &:hover{
    background-color: var(--gray-primary);
  }
}

.square {
  height: 34px;
  width: 34px;
  border-radius: 5px;
  background-color: var(--accent-color-super-muted);

  &:hover {
    background-color: var(--accent-color);
  }
}

.completed{
  background-color: var(--accent-color);
}

.current{
  background-color: var(--accent-color);
  border-style: solid;
  border-color: var(--text-color);
}
</style>
