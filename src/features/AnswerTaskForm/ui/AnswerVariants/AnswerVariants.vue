<template>
  <VStack max v-if="!isLoading" gap="24">
    <RadioButton
      v-for="([key, value], index) in Object.entries(variants)"
      :class="['answer', { selected: key === modelValue }]"
      :key="index"
      :value="key"
      :model-value="modelValue"
      :label="value"
      @update:model-value="handleClick"
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
  variants: Record<string, string>
  modelValue?: string
  isLoading?: boolean
}
defineProps<AnswerVariantsProps>()

const emits = defineEmits(['update:modelValue'])
const handleClick = (value: string) => {
  emits('update:modelValue', value)
}
</script>

<style scoped>
.answer {
  width: 100%;
  padding: 30px 45px;
  border-radius: 20px;
  cursor: pointer;
  background: var(--gray-secondary);
  transition: background var(--transition-duration);

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
