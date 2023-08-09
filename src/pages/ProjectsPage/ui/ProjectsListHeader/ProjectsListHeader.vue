<script setup lang="ts">
import ProjectsFilter from '../ProjectsFilter/ProjectsFilter.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import { useModal } from '@/shared/lib/hooks/useModal'
import ConnectToProjectModal from '@/features/ConnectToProject'
import { watchEffect } from 'vue'
import { NotificationType, useNotificationStore } from '@/entities/Notification'

const [isVisible, { openModal, closeModal }] = useModal()
const notificationStore = useNotificationStore()
</script>

<template>
  <HStack :max="true" justify="between">
    <HStack gap="50">
      <AppText size="xl" weight="700" variant="accent"> Проекты </AppText>
      <ProjectsFilter />
    </HStack>
    <AppButton size="l" @click="openModal">Присоединиться к проекту</AppButton>
  </HStack>
  <ConnectToProjectModal :on-close="closeModal" :is-open="isVisible" />
</template>

<style scoped lang="scss"></style>
