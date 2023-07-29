<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import BirthdateInput from '@/shared/ui/BirthdateInput/BirthdateInput.vue'
import type { PropType } from 'vue'
import { computed, ref } from 'vue'
import Loader from '@/shared/assets/icons/loader.svg'

import { AuthForm } from '@/features/AuthForm/const/const'
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
    router.push(routes.projects())
  }
}
</script>

<template>
  <VStack max gap="30">
    <HStack max>
      <div class="left inner-wrapper">
        <AppText
          class="profile-type"
          :class="[isRootActive ? 'secondary' : 'underlined']"
          @click="switchProfiles"
          >Разметчик</AppText
        >
      </div>
      <div class="vertical-line small"></div>
      <div class="right inner-wrapper">
        <AppText
          class="profile-type"
          :class="[isRootActive ? 'underlined' : 'secondary']"
          @click="switchProfiles"
          >Root</AppText
        >
      </div>
    </HStack>
    <hr class="line" />
    <HStack gap="50" max>
      <VStack gap="30" class="left inner-wrapper">
        <AppInput
          :value="authFormStore.registerForm.lastName"
          v-model="authFormStore.registerForm.lastName"
          label="Фамилия:"
        />
        <AppInput
          :value="authFormStore.registerForm.firstName"
          v-model="authFormStore.registerForm.firstName"
          label="Имя:"
        />
        <BirthdateInput label="Дата рождения:" />
      </VStack>
      <div class="vertical-line"></div>
      <VStack gap="30" class="right inner-wrapper">
        <AppInput
          :value="authFormStore.registerForm.email"
          v-model="authFormStore.registerForm.email"
          label="Почта:"
        />
        <AppInput
          :value="authFormStore.registerForm.password"
          v-model="authFormStore.registerForm.password"
          type="password"
          label="Пароль:"
        />
        <AppInput
          :value="repeatedPass"
          v-model="repeatedPass"
          type="password"
          label="Повторите пароль:"
        />
      </VStack>
    </HStack>
    <AppButton @click="onRegister">
      <Loader height="22" v-if="authFormStore.isLoading" />
      <span v-else> Зарегистрироваться </span>
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
  min-width: -webkit-min-content;
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
