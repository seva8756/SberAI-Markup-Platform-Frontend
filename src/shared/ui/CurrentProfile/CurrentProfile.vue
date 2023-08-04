<script setup lang="ts">
import AppText from '../TextViews/AppText/AppText.vue'
import HStack from '../Stack/HStack/HStack.vue'
import { routes } from '@/shared/const/routes'
import { getHStack } from '@/shared/lib/helpers/getHStack'

const props = defineProps({
  username: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    default: ''
  },
  profilePic: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <router-link :to="routes.userAccount()" :class="getHStack({ gap: '10' })">
    <div>
      <AppText weight="600">Имя Пользователя</AppText>
      <AppText size="s" variant="secondary" align="right">Root</AppText>
    </div>
    <img class="pfp" :src="profilePic" />
  </router-link>
</template>

<style scoped>
.pfp {
  border-radius: 50%;
  height: 45px;
  width: 45px;
  vertical-align: middle;
  display: inline-block;
}
</style>
