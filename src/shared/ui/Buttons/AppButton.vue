<script setup lang="ts">
import Loader from '@/shared/assets/icons/loader.svg'

import { computed } from 'vue'

type ButtonSize = 'xs' | 's' | 'm' | 'l' | 'custom'
type ButtonColor = 'primary' | 'muted' | 'gray'
type ButtonBorder = 'normal' | 'dashed'
type ButtonType = 'button' | 'link'

interface BaseAppButtonProps {
  disabled?: boolean
  isLoading?: boolean
  fullRound?: boolean
  color?: ButtonColor
  size?: ButtonSize
  border?: ButtonBorder
  buttonTag?: ButtonType
  selected?: boolean
  to?: string
  dataTestId?: string
}

interface ButtonProps extends BaseAppButtonProps {
  buttonTag?: 'button'
}

interface LinkProps extends BaseAppButtonProps {
  buttonTag?: 'link'
  to: string
}

const props = withDefaults(defineProps<LinkProps | ButtonProps>(), {
  disabled: false,
  isLoading: false,
  fullRound: false,
  selected: false,
  color: 'primary',
  size: 'm',
  buttonTag: 'button',
  border: 'normal'
})

const classes = computed(() => [
  'Button',
  props.color,
  props.size,
  { 'full-round': props.fullRound },
  { disabled: props.disabled },
  { selected: props.selected },
  props.border
])
</script>

<template>
  <button
    v-if="buttonTag === 'button'"
    :data-testid="dataTestId"
    :disabled="disabled"
    :class="classes"
  >
    <Loader height="22" v-if="isLoading" />
    <slot v-else />
  </button>
  <router-link v-else :to="to" :class="classes">
    <slot />
  </router-link>
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

.gray {
  background: var(--hint-color-muted);
  color: var(--text-color);

  &:hover {
    background: var(--hint-color-super-muted);
  }

  &.selected {
    background-color: var(--accent-color);
  }

  &.disabled {
    opacity: 0.7;
  }
}

.xs {
  height: 35px;
  width: 150px;
  font-size: 14px;
}

.s {
  width: 210px;
  font-size: 14px;
}

.m {
  width: 250px;
}

.l {
  width: 300px;
  height: 45px;
}

.dashed {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='18.5' ry='18.5' stroke='%2321A049FF' stroke-width='3' stroke-dasharray='10' stroke-dashoffset='0' /%3e%3c/svg%3e");
  background-color: transparent;
  color: var(--accent-color);

  &:hover {
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

.completed {
  background-color: var(--accent-color);
}

.current {
  background-color: var(--accent-color);
  border-style: solid;
  border-color: var(--text-color);
}

.disabled {
  opacity: 0.6;
  pointer-events: none;
}
</style>
