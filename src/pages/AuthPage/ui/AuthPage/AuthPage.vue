<script setup lang="ts">
import BackgroundLight from '@/shared/ui/BackgroundLight/BackgroundLight.vue'
import Logo from '@/shared/assets/icons/logo.svg'
import { AuthForm } from '@/features/AuthForm'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
</script>

<template>
  <VStack gap="30" class="login-page">
    <Logo />
    <AuthForm />
    <BackgroundLight left="-273px" bottom="-273px" />
    <BackgroundLight right="-273px" top="-273px" />
  </VStack>
</template>

<style scoped lang="scss">
.login-page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
}
</style>
