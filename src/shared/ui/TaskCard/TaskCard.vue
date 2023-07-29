<script setup lang="ts">
import AppCard from '@/shared/ui/AppCard/AppCard.vue'
import VStack from '@/shared/ui/Stack/VStack/VStack.vue'
import AppText from '@/shared/ui/TextViews/AppText/AppText.vue'
import HStack from '@/shared/ui/Stack/HStack/HStack.vue'
import AppButton from '@/shared/ui/Buttons/AppButton.vue'
import { router } from '@/app/providers/router'

defineProps({
  title: {
    type: String,
    default: 'Заголовок задания'
  },
  description: {
    type: String,
    default: 'Описание задания'
  },
  questionAmount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <AppCard class="card">
    <h-stack>
      <v-stack align="start" class="text-block" max="true">
        <AppText variant="primary" size="m" weight="700" class="title">{{ title }}</AppText>
        <AppText variant="primary" size="s" weight="400">{{ description }}</AppText>
      </v-stack>
      <v-stack>
        <AppButton
          border="normal"
          size="s"
          color="primary"
          :class="['start-block', 'start-button']"
          @click="router.push('project')"
          >Приступить</AppButton
        >
        <AppText variant="secondary" size="s" :class="['start-block', 'amount']"
          >Количество вопросов: {{ questionAmount }}</AppText
        >
      </v-stack>
    </h-stack>
  </AppCard>
</template>

<style scoped lang="scss">
.card {
  width: 930px;
  height: 150px;
}
.text-block {
  margin-left: 95px;
  margin-top: 25px;
  margin-bottom: 25px;
}

.start-block {
  margin-left: 75px;
  margin-right: 65px;
}

.start-button {
  margin-top: 35px;
}

.amount {
  margin-top: 10px;
}
</style>
