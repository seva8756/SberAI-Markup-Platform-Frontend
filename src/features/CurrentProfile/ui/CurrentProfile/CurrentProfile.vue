<script setup lang="ts">
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
// eslint-disable-next-line fsd-architecture-plugin/layer-imports
import { useAuthFormStore } from '@/features/AuthForm'
import { useRouter } from 'vue-router'
import { routes } from '@/shared/const/routes'

defineProps({
  username: {
    type: String,
    default: 'Имя Пользователя'
  },
  role: {
    type: String,
    default: 'Root'
  },
  id: {
    type: Number,
    default: 12345678
  },
  rating: {
    type: Number,
    default: 0
  },
  mail: {
    type: String,
    default: ''
  },
  taskCount: {
    type: Number,
    default: 0
  },
  imgCount: {
    type: Number,
    default: 0
  },
  regDate: {
    type: Date,
    default: new Date('January 1, 1970')
  }
})

const authFormStore = useAuthFormStore()
const router = useRouter()

function parseDateToString(date: Date) {
  const offset = date.getTimezoneOffset()
  date = new Date(date.getTime() - offset * 60 * 1000)
  return date.toDateString()
}

const onLogout = async () => {
  await authFormStore.logout()
  router.push(routes.auth())
}
</script>

<template>
  <HStack class="page-content" align="start" gap="85">
    <VStack justify="center" gap="24">
      <img src="@/shared/assets/icons/defaultPfp.png" alt="" />
      <AppButton size="xs" border="dashed">Обновить фото</AppButton>
      <AppButton @click="onLogout" size="xs">Выйти</AppButton>
    </VStack>
    <VStack class="user-information" align="start" gap="16">
      <div class="main-info">
        <AppText size="xl" weight="600">{{ username }}</AppText>
        <AppText size="xl" variant="secondary">ID: {{ id }}</AppText>
      </div>
      <AppText variant="secondary" class="additional-info"
        >{{ role }} | Рейтинг: {{ rating }}</AppText
      >
      <hr class="line" />

      <AppText size="l" weight="600" variant="underlined" style="margin-top: 20px"
        >Статистика</AppText
      >
      <AppText>Количество выполненных заданий: {{ taskCount }}</AppText>
      <AppText>Количество размеченных изображений: {{ imgCount }}</AppText>
      <AppText>Дата регистрации: {{ parseDateToString(regDate) }}</AppText>
      <AppText>Почта: {{ mail }}</AppText>
    </VStack>
  </HStack>
</template>

<style scoped>
.page-content {
  margin-left: 6.25%;
  margin-top: 88px;
  margin-right: 9.37%;
}

.main-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
}

.additional-info {
  margin-top: 10px;
}

.user-information {
  flex-grow: 1;
}

.line {
  width: 100%;
  height: 5px;
  background: var(--hint-color-muted);
  border: none;
  margin-top: 55px;
  border-radius: 5px;
}
</style>
@/features/AuthForm/model/store/authForm
