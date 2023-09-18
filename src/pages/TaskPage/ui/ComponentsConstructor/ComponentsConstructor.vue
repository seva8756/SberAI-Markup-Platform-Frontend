<script setup lang="ts">
import type { Component } from '@/entities/Component'
import ImagesShowcase from '@/features/ImagesShowcase'
import { useCurrentTaskStore } from '../../model/store/currentTaskStore'
import { computed } from 'vue'
import AnswerVariants from '../AnswerComponents/AnswerVariants.vue'
import AnswerTextArea from '../AnswerComponents/AnswerTextArea.vue'
import AnswerUploadImage from '../AnswerComponents/AnswerUploadImage.vue'
import AppSkeleton from '@/shared/ui/Skeletons/AppSkeleton.vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import ApproveAutoFillModal from '../ApproveAutoFillModal/ApproveAutoFillModal.vue'
interface ComponentsConstructorProps {
  components: Record<string, Component>
}

const props = defineProps<ComponentsConstructorProps>()
const currentTaskStore = useCurrentTaskStore()
const sortedComponents = computed(() => {
  return Object.entries(props.components).sort(
    (entry1, entry2) => entry1[1].position - entry2[1].position
  )
})
const [isVisible, { closeModal, openModal }] = useModal()

// const getCurrentComponent = (component: Component) => {
//   switch (component.type) {
//     case 'input':
//       return AnswerTextArea
//     case 'choice':
//       return AnswerVariants
//     case 'images':
//       return ImagesShowcase
//   }
// }
</script>

<template>
  <div class="wrapper-constructor">
    <template v-if="currentTaskStore.isLoading">
      <AppSkeleton class="block" />
      <AppSkeleton class="block" />
      <AppSkeleton class="block" />
    </template>
    <template v-else>
      <div
        v-for="[name, component] in sortedComponents"
        :key="name"
        :class="['block', { 'full-width': component.visuals?.fill }]"
      >
        <template v-if="component.purpose === 'answer'">
          <AnswerTextArea
            v-if="component.type === 'input'"
            :name="name"
            :display-name="component.name"
            v-model="currentTaskStore.answer[name]"
            placeholder="Введите ответ"
            @open-modal="openModal()"
          />
          <AnswerVariants
            v-else-if="component.type === 'choice'"
            :display-name="component.name"
            v-model="currentTaskStore.answer[name]"
            :variants="component.options"
          />
          <AnswerUploadImage
            v-else-if="component.type === 'image'"
            :display-name="component.name"
            :name="name"
          />
        </template>
        <template v-else>
          <ImagesShowcase
            :is-loading="currentTaskStore.isLoading"
            :display-name="component.name"
            v-if="component.type === 'images'"
            :images="currentTaskStore?.currentTask?.components[name].images ?? []"
          />
        </template>
      </div>
    </template>
    <ApproveAutoFillModal :on-close="closeModal" :is-open="isVisible" />
  </div>
</template>

<style scoped lang="scss">
@import '@/shared/styles/mixins';
.wrapper-constructor {
  display: flex;
  flex-wrap: wrap;
  gap: 60px;
  width: 100%;
}

.block {
  flex: 1 0 45%;
  height: 525px;
}

.full-width {
  flex-basis: 100%;
}
@include mobile {
  .block {
    height: 325px;
  }
}
</style>
