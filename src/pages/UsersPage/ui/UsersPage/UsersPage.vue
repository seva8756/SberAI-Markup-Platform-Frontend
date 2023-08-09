<script setup lang="ts">
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import UsersListFilter from '../UsersListFilter/UsersListFilter.vue'
import UsersGallery from '../UsersGallery/UsersGallery.vue'
</script>

<template>
  <VStack gap="24" class="container">
    <AppText size="xl" variant="accent" weight="700">Пользователи</AppText>
    <UsersListFilter />
    <UsersGallery />
  </VStack>
</template>

<style scoped>
.container {
  width: 1000px;
  margin: 0 auto;
}
</style>
