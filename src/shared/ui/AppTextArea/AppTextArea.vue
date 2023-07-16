<script setup lang="ts">
import { ref, type PropType } from 'vue';

const message = ref('');
type BackgroundType = 'transparent' | 'filled'

defineProps({
  backgroundType: {
    type: String as PropType<BackgroundType>,
    default: 'transparent'
  },
  placeholder: {
    type: String,
  }
})

</script>

<template>
  <div>
    <textarea v-model="message" :class="[backgroundType]" :placeholder=placeholder></textarea>
  </div>
</template>

<style scoped lang="scss">
  .transparent{
    border-radius: 15px;
    border: 3px solid #505050;
    background-color: transparent;
    color: var(--text-color);
    resize: vertical;
  }

  .filled {
    border-radius: 28.5px;
    border: 1px solid #505050;
    background-color: var(--gray-primary);
    color: var(--text-color);
    height: 270px;
    width: 930px;
    resize: vertical;
    padding: 8px 15px;

    &::placeholder{
      color: var(--hint-color);
    }
  }
</style>