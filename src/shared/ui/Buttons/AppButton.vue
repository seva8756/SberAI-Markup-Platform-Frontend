<script setup lang="ts">
import { type PropType, VueElement } from 'vue'

type ButtonSize = 's' | 'm' | 'l'
type ButtonColor = 'primary' | 'muted'

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
  }
})
</script>

<template>
  <button :class="['Button', color, { 'full-round': fullRound }, size]">
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
</style>
