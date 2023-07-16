<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppText from '@/shared/ui/AppText/AppText.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import BirthdateInput from '@/shared/ui/BirthdateInput/BirthdateInput.vue'
import { PropType } from 'vue'
import { computed, ref } from 'vue'

import { AuthForm } from '@/features/AuthForm/const/const'

defineProps({
  form: {
    type: String as PropType<AuthForm>
  }
})

const isRootActive = ref(false);

function switchProfiles(){
  isRootActive.value = !isRootActive.value;
}

const emit = defineEmits(['update:form'])

const switchToLoginForm = () => {
  emit('update:form', AuthForm.LOGIN)
}
</script>

<template>
  <VStack max gap="30">
      <HStack max>
        <div class="left inner-wrapper"><AppText class="profile-type" :class="[isRootActive ? 'secondary' : 'underlined' ]" @click ="switchProfiles">Разметчик</AppText></div>
        <div class="vertical-line small"></div>
        <div class="right inner-wrapper"><AppText class="profile-type" :class="[isRootActive ? 'underlined' : 'secondary' ]" @click ="switchProfiles">Root</AppText></div>
      </HStack>
    <hr class="line" />
    <HStack gap="50" max>
      <VStack gap="30" class="left inner-wrapper">
        <AppInput label="Фамилия:" />
        <AppInput label="Имя:" />
        <BirthdateInput label="Дата рождения:"/>
      </VStack>
      <div class="vertical-line"></div>
      <VStack gap="30" class="right inner-wrapper">
          <AppInput label="Почта:" />
          <AppInput type="password" label="Пароль:" />
          <AppInput type="password" label="Повторите пароль:" />
      </VStack>
    </HStack>
    <AppButton>Зарегистрироваться</AppButton>
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

.left.inner-wrapper, .right.inner-wrapper {
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

.vertical-line{
  width: 2px;
  border-radius: 2px;
  background-color: var(--hint-color-muted);
  height: 275px;
  &.small{
    height: 32px;
  }
}
</style>
