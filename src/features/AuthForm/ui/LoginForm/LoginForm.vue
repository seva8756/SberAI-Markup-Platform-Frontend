<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/AppText/AppText.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import type { PropType } from 'vue'

import { AuthForm } from '@/features/AuthForm/const/const'
import { router } from '@/app/providers/router'

defineProps({
  form: {
    type: String as PropType<AuthForm>
  }
})

const emit = defineEmits(['update:form'])

const switchToRegisterForm = () => {
  emit('update:form', AuthForm.REGISTER)
}
</script>

<template>
  <VStack max gap="30">
    <AppText variant="accent" weight="600">Логин</AppText>
    <hr class="line" />
    <AppInput label="Почта или ID:" />
    <AppInput label="Пароль:" />
    <AppButton size="m" @click="router.push('tasks')">Войти</AppButton>
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
