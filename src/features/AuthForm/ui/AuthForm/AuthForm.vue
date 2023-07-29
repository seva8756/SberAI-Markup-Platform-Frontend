<script setup lang="ts">
import AppCard from '@/shared/ui/AppCard/AppCard.vue'
import LoginForm from '../LoginForm/LoginForm.vue'
import RegisterForm from '../RegisterForm/RegisterForm.vue'
import { ref } from 'vue'
import { AuthForm } from '@/features/AuthForm/const/const'

const currentScreen = ref(AuthForm.LOGIN)
</script>

<template>
  <AppCard
    border
    padding-horizontal="45"
    padding-vertical="30"
    :class="[currentScreen == AuthForm.LOGIN ? 'auth' : 'register']"
  >
    <LoginForm v-model:formType="currentScreen" v-if="currentScreen === AuthForm.LOGIN" />
    <RegisterForm v-model:formType="currentScreen" v-else />
  </AppCard>
</template>

<style scoped lang="scss">
.auth {
  width: 450px;
}

.register {
  width: 930px;
}
</style>
