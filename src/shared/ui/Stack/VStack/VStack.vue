<script setup lang="ts">
import FlexWrapper, {
  FlexAlign,
  FlexGap,
  FlexJustify
} from '@/shared/ui/Stack/FlexWrapper/FlexWrapper.vue'
import { PropType } from 'vue'
defineProps({
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
  <FlexWrapper direction="column" :align="align" :gap="gap" :max="max" :justify="justify">
    <slot />
  </FlexWrapper>
</template>

<style scoped lang="scss"></style>
