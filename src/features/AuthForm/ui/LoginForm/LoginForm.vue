<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import Loader from '@/shared/assets/icons/loader.svg'

import { AuthForm } from '@/features/AuthForm/const/const'
import { router } from '@/app/providers/router'
import { useAuthFormStore } from '@/features/AuthForm/model/store/authForm'
import { routes } from '@/shared/const/routes'

interface LoginFormProps {
  formType: AuthForm
}

defineProps<LoginFormProps>()

const emit = defineEmits(['update:formType'])
const authFormStore = useAuthFormStore()
const switchToRegisterForm = () => {
  emit('update:formType', AuthForm.REGISTER)
}
const onLogin = async () => {
  await authFormStore.login()
  router.push(routes.projects())
}
</script>

<template>
  <VStack max gap="30">
    <AppText variant="accent" weight="600">Логин</AppText>
    <hr class="line" />
    <AppInput
      :value="authFormStore.loginForm.email"
      v-model="authFormStore.loginForm.email"
      label="Почта или ID:"
    />
    <AppInput
      :value="authFormStore.loginForm.password"
      v-model="authFormStore.loginForm.password"
      type="password"
      label="Пароль:"
    />
    <AppButton :disabled="authFormStore.isLoading" size="m" @click="onLogin">
      <Loader height="22" v-if="authFormStore.isLoading" />
      <span v-else> Войти </span>
    </AppButton>
    <AppButton color="muted" size="s" @click="switchToRegisterForm">Зарегистрироваться</AppButton>
  </VStack>
</template>

<style scoped lang="scss">
.line {
  width: 100%;
  height: 1px;
  background: var(--hint-color-muted);
  border: none;
}
</style>
