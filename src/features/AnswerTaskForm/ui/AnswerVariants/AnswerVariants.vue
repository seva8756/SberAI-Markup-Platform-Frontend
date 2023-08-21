<template>
  <VStack max :gap="isMobile ? '16' : '24'" v-if="isLoading">
    <AppSkeleton class="variant-skeleton" v-for="n in 3" :key="n" />
  </VStack>
  <template v-else>
    <div v-if="Object.keys(variants).length > 3" class="grid">
      <RadioButton
        v-for="([key, value], index) in Object.entries(variants)"
        :class="['answer', 'answer-small', { selected: key === modelValue }]"
        :key="index"
        :value="key"
        :small="true"
        :model-value="modelValue"
        :label="value"
        @update:model-value="handleClick"
      />
    </div>
    <VStack v-else max :gap="isMobile ? '16' : '24'">
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
  </template>
</template>

<script setup lang="ts">
import RadioButton from '@/shared/ui/AppRadiobutton/RadioButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import { isMobile } from 'mobile-device-detect'
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

<style scoped lang="scss">
@import '@/shared/styles/mixins';

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  @include mobile {
    grid-template-columns: repeat(1, 1fr);
  }
}

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

.answer-small {
  padding: 14px 30px;
}

.variant-skeleton {
  width: 720px;
  height: 96px;
  border-radius: 20px;
}

@include mobile {
  .answer {
    padding: 16px 30px;
    border-radius: 15px;
  }

  .variant-skeleton {
    width: 100%;
    height: 52px;
  }
}
</style>
