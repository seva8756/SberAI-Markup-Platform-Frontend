<script setup lang="ts">
import AppModal from '@/shared/ui/Modal/AppModal.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import { useConnectToProjectStore } from '../../model/store/connectToProjectStore'
import { useRouter } from 'vue-router'
import { routes } from '@/shared/const/routes'
interface ConnectToProjectModalProps {
  isLoading?: boolean
  isOpen: boolean
  onClose: () => void
}

const props = defineProps<ConnectToProjectModalProps>()

const connectToProjectStore = useConnectToProjectStore()
const router = useRouter()
const connectToProject = async () => {
  await connectToProjectStore.connectToProject()
  props.onClose()
}
</script>

<template>
  <AppModal :open="isOpen" :on-close="onClose">
    <VStack class="modal" max gap="30">
      <AppText variant="accent" weight="600">Присоединиться к проекту</AppText>
      <hr class="line" />
      <AppInput v-model="connectToProjectStore.code" label="Код проекта" />
      <AppInput v-model="connectToProjectStore.password" type="password" label="Пароль проекта:" />
      <AppButton size="m" @click="connectToProject"> Приступить </AppButton>
    </VStack>
  </AppModal>
</template>

<style scoped lang="scss">
.modal {
  width: 360px;
}

.line {
  width: 100%;
  height: 1px;
  background: var(--hint-color-muted);
  border: none;
}
</style>
