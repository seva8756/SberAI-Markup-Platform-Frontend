<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/AppText/AppText.vue'
import AppButton from '@/shared/ui/AppButton/AppButton.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import { PropType } from 'vue'

import { AuthForm } from '@/features/AuthForm/const/const'

defineProps({
  form: {
    type: String as PropType<AuthForm>
  }
})

const emit = defineEmits(['update:form'])

const switchToLoginForm = () => {
  emit('update:form', AuthForm.LOGIN)
}
</script>

<template>
  <VStack max gap="30">
    <AppText variant="accent" weight="600">Регистрация</AppText>
    <hr class="line" />
    <AppInput label="Почта" />
    <AppInput type="password" label="Пароль:" />
    <AppInput type="password" label="Повторите пароль::" />
    <AppButton>Зарегистрироваться</AppButton>
    <AppButton size="s" color="muted" @click="switchToLoginForm">Назад</AppButton>
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
