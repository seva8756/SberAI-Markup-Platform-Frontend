<script setup lang="ts">
import ProjectsFilter from '../ProjectsFilter/ProjectsFilter.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import ConnectToProjectModal from '@/features/ConnectToProject'
import { watchEffect } from 'vue'

const [isVisible, { openModal, closeModal }] = useModal()
</script>

<template>
  <HStack class="projects" justify="between">
    <HStack gap="50">
      <AppText size="xl" weight="700" variant="accent"> Проекты </AppText>
      <ProjectsFilter />
    </HStack>
    <AppButton size="l" @click="openModal">Присоединиться к проекту</AppButton>
  </HStack>
  <ConnectToProjectModal :on-close="closeModal" :is-open="isVisible" />
</template>

<style scoped lang="scss">
.projects {
  width: 930px;
}
</style>
