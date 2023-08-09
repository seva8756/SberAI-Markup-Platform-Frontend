<script setup lang="ts">
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppModal from '@/shared/ui/Modal/AppModal.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'

interface ApproveAutoFillModalProps {
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
  onApprove: () => void
}
const props = defineProps<ApproveAutoFillModalProps>()

const onApproveAuto = () => {
  props.onClose()
  props.onApprove()
}
</script>

<template>
  <AppModal :open="isOpen" :on-close="onClose">
    <VStack gap="24">
      <AppText>Будьте внимательны, ваш текущий текст будет заменен</AppText>
      <HStack gap="10">
        <AppButton size="xs" @click="onApproveAuto">Да</AppButton>
        <AppButton size="xs" @click="onClose">Нет</AppButton>
      </HStack>
    </VStack>
  </AppModal>
</template>

<style scoped lang="scss"></style>
