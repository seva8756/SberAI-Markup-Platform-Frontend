<script setup lang="ts">
import AppInput from '@/shared/ui/AppInput/AppInput.vue'
import { useUsersListStore } from '../../model/store/usersListStore'
const usersListStore = useUsersListStore()
</script>

<template>
  <AppInput v-model="usersListStore.searchQuery" />
</template>

<style scoped lang="scss"></style>
