<template>
  <VStack v-if="!isLoading" gap="24">
    <RadioButton
      v-for="(variant, index) in variants"
      :class="['answer', { selected: variant === modelValue }]"
      :key="index"
      :value="variant"
      :model-value="modelValue"
      :label="variant"
      @update:model-value="onChange"
    />
  </VStack>
  <VStack gap="24" v-else>
    <AppSkeleton class="variant-skeleton" v-for="n in 3" :key="n" />
  </VStack>
</template>

<script setup lang="ts">
import RadioButton from '@/shared/ui/AppRadiobutton/RadioButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
interface AnswerVariantsProps {
  variants: string[]
  modelValue?: string
  onChange: (value: string) => void
  isLoading?: boolean
}
defineProps<AnswerVariantsProps>()
</script>

<style scoped>
.answer {
  width: 720px;
  padding: 30px 45px;
  border-radius: 20px;
  cursor: pointer;
  background: var(--gray-secondary);

  &.selected {
    background: var(--accent-color);
  }
}

.variant-skeleton {
  width: 720px;
  height: 96px;
  border-radius: 20px;
}
</style>
