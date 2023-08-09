<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import BirthdateInput from '@/shared/ui/BirthdateInput/BirthdateInput.vue'
import { ref } from 'vue'

import { AuthForm, validationErrorsMapper } from '../../const/const'
import { useAuthFormStore } from '../../model/store/authForm'
import { useRouter } from 'vue-router'
import { routes } from '@/shared/const/routes'

interface RegisterFormProps {
  formType: AuthForm
}

defineProps<RegisterFormProps>()

const isRootActive = ref(false)

const authFormStore = useAuthFormStore()

function switchProfiles() {
  isRootActive.value = !isRootActive.value
}

const emit = defineEmits(['update:formType'])
const router = useRouter()

const switchToLoginForm = () => {
  emit('update:formType', AuthForm.LOGIN)
}

const repeatedPass = ref('')

const onRegister = async () => {
  if (repeatedPass.value === authFormStore.registerForm.password) {
    await authFormStore.register()
    await router.push(routes.projects())
  }
}
</script>

<template>
  <VStack max gap="30">
    <HStack justify="center" max>
      <AppText variant="accent" weight="600">Регистрация</AppText>
    </HStack>
    <hr class="line" />
    <HStack align="start" gap="50" max>
      <VStack gap="30" class="left inner-wrapper">
        <AppInput v-model="authFormStore.registerForm.lastName" label="Фамилия:" />
        <AppInput v-model="authFormStore.registerForm.firstName" label="Имя:" />
      </VStack>
      <div class="vertical-line"></div>
      <VStack gap="30" class="right inner-wrapper">
        <AppInput v-model="authFormStore.registerForm.email" label="Почта:" />
        <AppInput v-model="authFormStore.registerForm.password" type="password" label="Пароль:" />
        <AppInput v-model="repeatedPass" type="password" label="Повторите пароль:" />
      </VStack>
    </HStack>
    <!--    <VStack v-if="authFormStore.validationErrors.length">-->
    <!--      <AppText v-for="error in authFormStore.validationErrors" :key="error" variant="error">{{-->
    <!--        validationErrorsMapper[error]-->
    <!--      }}</AppText>-->
    <!--    </VStack>-->
    <AppButton
      :disabled="authFormStore.isLoading"
      :is-loading="authFormStore.isLoading"
      @click="onRegister"
    >
      Зарегистрироваться
    </AppButton>
    <AppButton size="s" color="muted" @click="switchToLoginForm">Назад</AppButton>
  </VStack>
</template>

<style scoped lang="scss">
.line {
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: var(--hint-color-muted);
  border: none;
}

.container {
  display: flex;
  width: 100%;
}

.left.inner-wrapper,
.right.inner-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
}

.left.inner-wrapper {
  justify-content: flex-end;
  margin-right: 10px;
}

.right.inner-wrapper {
  justify-content: flex-start;
  margin-left: 10px;
}

.profile-type {
  cursor: pointer;
}

.vertical-line {
  width: 2px;
  border-radius: 2px;
  background-color: var(--hint-color-muted);
  height: 275px;
  &.small {
    height: 32px;
  }
}
</style>
