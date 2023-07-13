<script setup lang="ts">
import type { PropType } from 'vue'

export type TextVariant = 'primary' | 'accent' | 'error' | 'secondary' | 'underlined'
export type TextSize = 's' | 'm' | 'l' | 'xl'
export type TextAlign = 'right' | 'left' | 'center'
export type TextWeight = '400' | '500' | '600'

const mapWeightToClass: Record<TextWeight, string> = {
  400: 'weight_400',
  500: 'weight_500',
  600: 'weight_600'
}

defineProps({
  size: {
    type: String as PropType<TextSize>,
    default: 'm'
  },
  weight: {
    type: Number as PropType<TextWeight>,
    default: 400
  },
  align: {
    type: String as PropType<TextAlign>,
    default: 'left'
  },
  variant: {
    type: String as PropType<TextVariant>,
    default: 'primary'
  },
  remark: {
    type: String,
    default: ''
  }
})
</script>

<template>

    <p :class="['text', variant, align, size, mapWeightToClass[weight]]">
      <slot />
      <p v-if="remark" class="remark">{{ remark }}</p>
    </p>


</template>

<style scoped lang="scss">
.content {
  display: flex;
}

.remark {
  color: rgba(255, 255, 255, 0.60);
  font-family: Montserrat;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.left {
  text-align: left;
}

.right {
  text-align: right;
}

.center {
  text-align: center;
}

.weight_400 {
  font-weight: 400;
}

.weight_500 {
  font-weight: 500;
}

.weight_600 {
  font-weight: 600;
}

.s {
  font-size: var(--font-size-s);
}

.m {
  font-size: var(--font-size-m);
}

.l {
  font-size: var(--font-size-l);
}

.xl {
  font-size: var(--font-size-xl);
}

.primary {
  color: var(--text-color);
}

.accent {
  color: var(--accent-color);
}

.secondary {
  color: var(--text-color-secondary);
}

.underlined {
  text-decoration: underline;
}
</style>
