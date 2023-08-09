<template>
  <VStack gap="50" align="center">
    <NotFoundIcon />
    <AppText variant="secondary-muted" weight="700" size="xxl" align="center"
      >404 <br />
      Страница не найдена
    </AppText>
  </VStack>
</template>

<script setup lang="ts">
import NotFoundIcon from '@/shared/assets/icons/not_found.svg'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
</script>

<style scoped></style>
